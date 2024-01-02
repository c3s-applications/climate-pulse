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
    const timeSeriesRef = useRef();
    const [revision, setRevision] = useState(0);
    const [plotlyData, setPlotlyData] = useState(null);
    const [plotlyLayout, setPlotlyLayout] = useState(null);
    const [highlightsApplied, setHighlightsApplied] = useState(false)
    const [jsonSrc, setJsonSrc] = useState('time-series-absolute.json')
    const prevJsonSrc = useRef();

    const timeseriesType = useSelector(state => state.controls.timeseriesType);
    const prevTimeseriesType = useRef();

    const resetChart = useSelector(state => state.controls.resetChart);

    const currentYears = useSelector(state => state.controls.currentYears);
    const prevCurrentYears = useRef();

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

    useEffect(() => {
        if (timeseriesType != prevTimeseriesType.current) {
            if (timeseriesType === 'absolute') {
                setJsonSrc('time-series-absolute.json')
                prevJsonSrc.current = 'time-series-anomalies.json'
            } else {
                setJsonSrc('time-series-anomalies.json')
                prevJsonSrc.current = 'time-series-anomalies.json'
            }
            prevTimeseriesType.current = timeseriesType
        }

        if (jsonSrc != prevJsonSrc.current) {
            fetch(jsonSrc)
                .then( resp => resp.json())
                .then((data)=> {
                    setPlotlyData(data.data)
                    setPlotlyLayout(data.layout)
                })
                .then(() => setHighlightsApplied(false))
                prevJsonSrc.current = jsonSrc
        }

        if (highlightsApplied == false) {
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
            if (currentYears != prevCurrentYears.current) {

                if (typeof prevCurrentYears.current !== 'undefined') {
                    for (var i = 0; i < prevCurrentYears.current.length; i++) {
                        timeSeriesRef.current.props.data.splice(timeSeriesRef.current.props.data.length-4, 1)
                    }
                }

                applyHighlights()
                
            }
            prevCurrentYears.current = currentYears
        }
    });

    function applyHighlights() {
        if (timeSeriesRef.current.props.data !== null) {
            for (var i = 0; i < currentYears.length; i++) {
                var currentYear = currentYears[i]
                const trace = timeSeriesRef.current.props.data[currentYear-1940]
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
            }
            timeSeriesRef.current.props.data.splice(-3, 0, newTrace)
            setRevision(revision + 1);
            timeSeriesRef.current.props.layout.datarevision = revision;
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
                style={{width: "100%", height: "100%"}}
                onHover={hoverHighlight}
                onUnhover={hoverReset}
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