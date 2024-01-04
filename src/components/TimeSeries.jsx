import React, { useState, useEffect, useRef } from "react"
import { useSelector, connect } from 'react-redux';
import { updateSettings } from "../actions/actions"
import Plot from 'react-plotly.js'

const excludeButtons = [
    'zoom', 'pan', 'zoomIn', 'zoomOut', 'select', 'lasso2d', 'resetScale',
    'autoScale', 'toImage',
];

const highlightableColor = '#e6e6e6'
const highlightColor = 'grey'

const addedColors = [
    '#DB2828',
    '#F2711C',
    '#FBBD08',
    '#21BA45',
    '#2185D0',
]

function TimeSeries(props) {

    const variable = useSelector(state => state.controls.variable);
    const prevVariable = useRef();

    const timeSeriesRef = useRef();
    const [revision, setRevision] = useState(0);
    const [plotlyData, setPlotlyData] = useState(null);
    const [plotlyLayout, setPlotlyLayout] = useState(null);
    const [highlightsApplied, setHighlightsApplied] = useState(false)
    const [jsonSrc, setJsonSrc] = useState(`time-series-${variable}-absolute.json`)
    const prevJsonSrc = useRef();

    const timeseriesType = useSelector(state => state.controls.timeseriesType);
    const prevTimeseriesType = useRef();

    const resetChart = useSelector(state => state.controls.resetChart);

    const currentYears = useSelector(state => state.controls.currentYears);
    const prevCurrentYears = useRef();

    function getStartYear() {
        if (variable === 'sea-temperature') {
            return 1979
        } else {
            return 1940
        }
    }

    function callUpdateSettings() {
        const { controls, dispatch } = props
    
        dispatch(
          updateSettings({
            settings: controls.settings
          })
        )
      }
  
    function setReset(value) {
        props.controls['resetChart'] = value
        props.controls['currentYears'] = []
        callUpdateSettings()
    }

    function handleUpdateSettings(setting, value) {
        props.controls[setting] = value
        callUpdateSettings()
    }

    function getDefaultStyle() {
        if (window.innerWidth < 768) {
            return {width: "100%", height: 400}
        } else {
            return {width: "100%", height: "100%"}
        }
    }

    function updateSrc() {
        fetch(jsonSrc)
            .then( resp => resp.json())
            .then((data)=> {
                setPlotlyData(data.data)
                setPlotlyLayout(data.layout)
            })
            .then(() => setHighlightsApplied(false))
    }

    function updateJson() {
        if (timeseriesType === 'absolute') {
            var src = `time-series-${variable}-absolute.json`
        } else {
            var src = `time-series-${variable}-anomalies.json`
        }
        setJsonSrc(src)
    }

    useEffect(() => {
        if (timeseriesType !== prevTimeseriesType.current) {
            updateJson()
            prevTimeseriesType.current = timeseriesType
        }

        if (jsonSrc !== prevJsonSrc.current ) {
            updateSrc()
            prevJsonSrc.current = jsonSrc
        }

        if (variable !== prevVariable.current) {
            updateJson()
            prevVariable.current = variable
        }

        if (highlightsApplied === false) {
            applyHighlights()
            setHighlightsApplied(true)
        }

        if (resetChart) {
            fetch(jsonSrc)
                .then( resp => resp.json())
                .then((data)=> {
                    setPlotlyData(data.data)
                    setPlotlyLayout(data.layout)
                })
            setReset(false)
        }

        if (timeSeriesRef.current.props.data !== null) {
            if (currentYears !== prevCurrentYears.current) {

                if (typeof prevCurrentYears.current !== 'undefined') {
                    for (var i = 0; i < prevCurrentYears.current.length; i++) {
                        timeSeriesRef.current.props.data.splice(timeSeriesRef.current.props.data.length-4, 1)
                    }

                    applyHighlights()
                    setHighlightsApplied(true)
                }
                
            }
            prevCurrentYears.current = currentYears
        }
    });

    function applyHighlights() {
        if (timeSeriesRef.current.props.data !== null) {
            for (var i = 0; i < currentYears.length; i++) {
                var currentYear = currentYears[i]
                var traceIndex = currentYear-getStartYear()
                if (traceIndex >= 0) {
                    const trace = timeSeriesRef.current.props.data[traceIndex]
                    var newTrace = {
                        x: trace.x,
                        y: trace.y,
                        line: {'color': addedColors[i], width: 2},
                        hovertemplate: "<b>" + currentYear.toString() + " - %{x|%B %-d}</b><br>Temperature: %{y}°C<br>1991-2020 average: %{customdata[0]:.2f}°C<br>Anomaly: %{customdata[1]:.2f}°C<extra></extra>",
                        customdata: trace.customdata,
                        name: currentYear.toString(),
                    }
                    timeSeriesRef.current.props.data.splice(-3, 0, newTrace)
                }
            }
            setRevision(revision + 1);
            timeSeriesRef.current.props.layout.datarevision = revision;
        }
    }

    function hoverHighlight(d) {
        var curveNumber = d.points[0].curveNumber
        const trace = timeSeriesRef.current.props.data[curveNumber]

        if (trace.line.color === highlightableColor) {
            var newTrace = {
                x: trace.x,
                y: trace.y,
                line: {'color': highlightColor, width: 2.5},
                hovertemplate: trace.hovertemplate,
                hoverlabel: trace.hoverlabel,
                customdata: trace.customdata,
                showlegend: false,
                name: curveNumber + getStartYear(),
            }
            timeSeriesRef.current.props.data.splice(-3, 0, newTrace)
            setRevision(revision + 1);
            timeSeriesRef.current.props.layout.datarevision = revision;
        }
    }

    function setTime(d) {
        var year = d.points[0].data.name
        if (["2023", "2024"].includes(year)) {
            console.log(year)
            if (year.length > 4) {
                year = d.points[0].curveNumber + getStartYear()
                if (year === 2026) {
                    year = 2023
                }
            }
            var dayOfYear = d.points[0].pointIndex + 1
            if (year % 4 === 0 && dayOfYear > 59) {
                dayOfYear = dayOfYear + 1
            }
            var date = new Date(new Date(year, 0).setDate(dayOfYear))

            console.log(date)

            handleUpdateSettings('globeTime', date)
            hoverReset(d)
        }
    }

    function hoverReset(d) {
        for (var i = 0; i < timeSeriesRef.current.props.data.length; i++) {
            const trace = timeSeriesRef.current.props.data[i]
            if (trace.line.color === highlightColor) {
                timeSeriesRef.current.props.data.splice(i, 1)
            }
        }
        setRevision(revision + 1);
        timeSeriesRef.current.props.layout.datarevision = revision;
    }

    return (
        <div>
            <Plot
                divId="timeseries"
                ref={timeSeriesRef}
                data={plotlyData}
                layout={plotlyLayout}
                config={{
                    modeBarButtonsToRemove: excludeButtons,
                    displaylogo: false,
                    showTips: false,
                }}
                useResizeHandler
                revision={revision}
                style={getDefaultStyle()}
                onHover={hoverHighlight}
                onUnhover={hoverReset}
                onClick={setTime}
            />
        </div>
    )
}

const mapStateToProps = state => {
    const controls = state.controls
    return {
        controls
    }
}

export default connect(mapStateToProps)(TimeSeries)