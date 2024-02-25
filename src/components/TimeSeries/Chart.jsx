import React, { useState, useEffect, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { updateTimeSeries } from "../../actions/actions"
import Plot from 'react-plotly.js'
import defaultPlot from './default.json';
import { getAnnualValue, getStartYear, sanitiseYears } from './AnnualValues'
import { applyColormap } from './Colors'
import { Divider } from 'semantic-ui-react'


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
    const maxDate = useSelector(state => state.maxDate);
    const quantity = useSelector(state => state.timeSeries.quantity);

    const reset = useSelector(state => state.timeSeries.reset);
    const loaded = useSelector(state => state.timeSeries.loaded);
    const prevReset = useRef()

    const highlightYears = useSelector(state => state.timeSeries.highlightYears);
    const prevHighlightYears = useRef(highlightYears)
    const [highlightsApplied, setHighlightsApplied] = useState(false)

    const defaultHighlightYears = useSelector(state => state.timeSeries.defaultHighlightYears);

    const timeSeriesUrl = 'https://sites.ecmwf.int/data/climatepulse/timeseries/'
    const jsonSrc = `time-series-${variable}-${quantity}.json`;
    const prevJsonSrc = useRef()

    const [plotlyPlot, setPlotlyPlot] = useState(defaultPlot);

    function getVariable() {
        if (variable === 'air-temperature') {
            return 'Surface air temperature'
        } else {
            return 'Sea surface temperature'
        }
    }

    function getQuantity() {
        if (quantity === 'absolute') {
            return 'mean'
        } else {
            return 'anomaly'
        }
    }

    function getExtent() {
        if (variable === 'air-temperature') {
            return 'global'
        } else {
            return '60°S - 60°N'
        }
    }

    const applyHighlights = (years) => {
        years = sanitiseYears(variable, years)
        years.sort(function(a, b){
            return getAnnualValue(variable, b)-getAnnualValue(variable, a)
        })
        var colors = applyColormap(years.length)

        var hovertemplate = ((quantity == 'absolute') ? 
            " - %{x|%B %-d}</b><br>Temperature: %{y}°C<br>1991-2020 average: %{customdata[0]:.2f}°C<br>Anomaly: %{customdata[1]:.2f}°C<extra></extra>"
            :
            " - %{x|%B %-d}</b><br>Anomaly: %{y:+.2g}°C<br>1991-2020 average: %{customdata[0]:.2f}°C<extra></extra>"
        )

        for (var i = 0; i < years.length; i++) {
            let year = years[i]

            let traceIndex = year-getStartYear(variable)
            if (traceIndex >= 0) {
                const trace = timeSeriesRef.current.props.data[traceIndex]
                var newTrace = {
                    x: trace.x,
                    y: trace.y,
                    line: {color: colors[i], width: 2},
                    hovertemplate: "<b>" + year.toString() + hovertemplate,
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
        fetch(timeSeriesUrl + jsonSrc)
            .then(resp => resp.json())
            .then((data)=> {
                data.layout["height"] = ((window.innerWidth < 768) ? 400 : 593)
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
        <div id='timeseries'>
        {/* <Image src='logos/c3s-mini-positive.png' size='mini' spaced='right' floated='right'/> */}
        <h3
            align="left"
            style={{
                marginLeft: 35,
                marginTop: 18,
                marginBottom: 0,
                fontWeight: "normal",
                fontSize: 19,
                lineHeight: 1,
                color: "#2A3F5F",
            }}
        >
            <b>{getVariable()}</b>
            <br></br>
            <span style={{fontSize: 14}}>ERA5 {getStartYear(variable)}-{maxDate.getFullYear()} ({getExtent()} {getQuantity()})</span>
            <br></br>
            <span style={{fontSize: 13}}>
            Data: ERA5 ● Credit: C3S/ECMWF
            </span>
  
        </h3>
        <Divider fitted hidden />
        <Divider fitted hidden />
        <div>
        <Plot
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
        </div>
    )
}

export default TimeSeriesChart