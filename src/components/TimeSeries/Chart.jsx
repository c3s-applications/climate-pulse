import React, { useState, useEffect, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { updateTimeSeries } from "../../actions/actions"
import Plot from 'react-plotly.js'
import defaultPlot from './default.json';
import { getAnnualValue, getStartYear, sanitiseYears } from './AnnualValues'
import { applyColormap } from './Colors'


const plotlyConfig = {
    modeBarButtonsToRemove: [
        'zoom', 'pan', 'zoomIn', 'zoomOut', 'select', 'lasso2d',
        'resetScale', 'autoScale', 'toImage',
    ],
    displaylogo: false,
    showTips: false,
}

const TimeSeriesChart = () => {

    const dispatch = useDispatch()

    const timeSeriesRef = useRef();
    const [revision, setRevision] = useState(0);

    const variable = useSelector(state => state.variable);
    const quantity = useSelector(state => state.timeSeries.quantity);

    const reset = useSelector(state => state.timeSeries.reset);
    const loaded = useSelector(state => state.timeSeries.loaded);
    const prevReset = useRef()

    const highlightYears = useSelector(state => state.timeSeries.highlightYears);
    const prevHighlightYears = useRef(highlightYears)
    const [highlightsApplied, setHighlightsApplied] = useState(false)

    const defaultHighlightYears = useSelector(state => state.timeSeries.defaultHighlightYears);

    const jsonSrc = `time-series-${variable}-${quantity}.json`;
    const prevJsonSrc = useRef()

    const [plotlyPlot, setPlotlyPlot] = useState(defaultPlot);

    const applyHighlights = (years) => {
        years = sanitiseYears(variable, years)
        years.sort(function(a, b){
            return getAnnualValue(variable, b)-getAnnualValue(variable, a)
        })
        var colors = applyColormap(years.length)

        for (var i = 0; i < years.length; i++) {
            let year = years[i]

            let traceIndex = year-getStartYear(variable)
            if (traceIndex >= 0) {
                const trace = timeSeriesRef.current.props.data[traceIndex]
                var newTrace = {
                    x: trace.x,
                    y: trace.y,
                    line: {color: colors[i], width: 2},
                    hovertemplate: "<b>" + year.toString() + " - %{x|%B %-d}</b><br>Temperature: %{y}°C<br>1991-2020 average: %{customdata[0]:.2f}°C<br>Anomaly: %{customdata[1]:.2f}°C<extra></extra>",
                    customdata: trace.customdata,
                    name: year.toString(),
                    isHighlight:true
                }
                timeSeriesRef.current.props.data.splice(-3, 0, newTrace)
            }
        }
        setRevision(revision + 1);
        timeSeriesRef.current.props.layout.datarevision = revision;
        setHighlightsApplied(true)
    }

    const fetchJson = () => {
        dispatch(updateTimeSeries({loaded: false}))
        fetch(jsonSrc)
            .then(resp => resp.json())
            .then((data)=> {
                data.layout["height"] = ((window.innerHeight < 768) ? 400 : 527)
                setPlotlyPlot(data)
            })
            .then(() => setHighlightsApplied(false))
            .then(() => dispatch(updateTimeSeries({loaded: true})))

    }

    useEffect(() => {
        if (reset !== prevReset.current || jsonSrc !== prevJsonSrc.current) {
            if (reset !== prevReset.current) {
                dispatch(updateTimeSeries({ highlightYears: defaultHighlightYears }))
                prevReset.current = reset
            }
            fetchJson()
            prevJsonSrc.current = jsonSrc
        }

        if (highlightsApplied === false) {
            applyHighlights(highlightYears)
        }

        if (highlightYears != prevHighlightYears.current) {
            if (typeof prevHighlightYears.current !== 'undefined') {
                for (var i = 0; i < prevHighlightYears.current.length; i++) {
                    if (sanitiseYears(variable, prevHighlightYears.current).includes(prevHighlightYears.current[i])) {
                        timeSeriesRef.current.props.data.splice(timeSeriesRef.current.props.data.length-4, 1)
                    }
                }
            }
            applyHighlights(highlightYears)
            prevHighlightYears.current = highlightYears
        }

    }, )

    return (
        <div>
        <Plot
            divId="timeseries"
            ref={timeSeriesRef}
            data={plotlyPlot.data}
            layout={plotlyPlot.layout}
            config={plotlyConfig}
            revision={revision}
            style={{width: "100%", height: "100%"}}
            useResizeHandler
            onClick={(d) => {
                var traceYear = d.points[0].curveNumber + getStartYear(variable)
                if (traceYear < 2024 && !highlightYears.includes(traceYear.toString())) {
                    let newHighlightYears = highlightYears.concat(traceYear.toString())
                    dispatch(updateTimeSeries({highlightYears: newHighlightYears}))
                }
            }}
        />
        </div>
    )
}

export default TimeSeriesChart