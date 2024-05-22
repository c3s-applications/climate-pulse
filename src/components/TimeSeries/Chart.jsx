import React, { useState, useEffect, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { updateTimeSeries } from "../../actions/actions"
import Plot from 'react-plotly.js'
import defaultPlot from './default.json';
import { getAnnualValue, getStartYear, sanitiseYears } from './AnnualValues'
import { applyColormap } from './Colors'
import { Divider, Image, Grid } from 'semantic-ui-react'


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
            if (quantity === 'absolute') {
                return 'Global surface air temperature'
            } else {
                return 'Global surface air temperature anomaly'
            }
        } else {
            if (quantity === 'absolute') {
                return `Sea surface temperature`
            } else {
                return `Sea surface temperature anomaly`
            }
        }
    }

    function getQuantity() {
        if (quantity === 'absolute') {
            return 'average'
        } else {
            return 'anomaly'
        }
    }
    
    function getSecondLineExtra() {
        if (quantity === 'absolute') {
            return ' ● Data ERA5'
        } else {
            return ' ● Baseline: 1991-2020'
        }
    }
    function getThirdLineExtra() {
        if (quantity === 'absolute') {
            return ''
        } else {
            return 'Data: ERA5 ● '
        }
    }

    function getExtent() {
        if (variable === 'air-temperature') {
            return ''
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
        <Divider hidden />
        <Grid>
            <Grid.Row verticalAlign="middle">
                <Grid.Column textAlign="center">
                    <h3
                        align="center"
                        style={{
                            fontWeight: "normal",
                            fontSize: 18,
                            lineHeight: 1.2,
                            color: "#2A3F5F",
                        }}
                    >
                    {window.innerWidth >= 768 &&
                        <>
                        <b>{getVariable()} {((getExtent() !== "") ? ` ● ${getExtent()}` : "")}</b>
                        <br></br>
                        <span style={{fontSize: 16}}>Daily average{getSecondLineExtra()}</span>
                        <br></br>
                        <span style={{fontSize: 16}}>
                        {getThirdLineExtra()}Credit: C3S/ECMWF
                        </span>
                        </>
                    }
                    {window.innerWidth < 768 &&
                        <>
                        <b>{getVariable()}</b>
                        {getExtent() !== "" &&
                            <>
                            <br></br>
                            <b>{getExtent()}</b>
                            </>
                        }
                        <br></br>
                        <span style={{fontSize: 16}}>Daily average{getSecondLineExtra()}</span>
                        <br></br>
                        <span style={{fontSize: 16}}>
                        {getThirdLineExtra()}Credit: C3S/ECMWF
                        </span>
                        </>
                    }
            
                    </h3>
                </Grid.Column>
                {/* <Grid.Column only="computer" width={2}>
                    <Image src='logos/c3s-mini-positive.png' size='mini' floated="right"/>
                </Grid.Column>
                <Grid.Column only="tablet" width={2}>
                    <Image src='logos/C3S_logo_compact.png' size='mini' floated="right"/>
                </Grid.Column> */}
            </Grid.Row>
        </Grid>
        <Divider fitted hidden />
        <Divider fitted hidden />
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
        <Divider fitted hidden />
        <Divider fitted hidden />
        <Divider fitted hidden />
        </div>
        </div>
    )
}

export default TimeSeriesChart