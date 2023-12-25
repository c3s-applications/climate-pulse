import React, { useState, useEffect, useRef } from "react"
import { useSelector } from 'react-redux';
import Plot from 'react-plotly.js'

const excludeButtons = [
    'zoom', 'pan', 'zoomIn', 'zoomOut', 'select', 'lasso2d', 'resetScale',
    'autoScale', 'toImage',
];

const highlightableColor = '#e6e6e6'
const highlightColor = 'grey'

function TimeSeries() {
    const timeSeriesRef = useRef();
    const [revision, setRevision] = useState(0);
    const [plotlyData, setPlotlyData] = useState(null);
    const [plotlyLayout, setPlotlyLayout] = useState(null);
    const [jsonSrc, setJsonSrc] = useState('time-series.json');

    const timeseriesType = useSelector(state => state.controls.timeseriesType);
    const prevTimeseriesType = useRef();

    useEffect(() => {
        if (timeseriesType != prevTimeseriesType.current) {
            if (timeseriesType === 'anomaly') {
                setJsonSrc('time-series.json')
            } else {
                setJsonSrc('time-series-anom.json')
            }
            fetch(jsonSrc)
                .then( resp => resp.json())
                .then((data)=> {
                    setPlotlyData(data.data)
                    setPlotlyLayout(data.layout)
                })
        }
        prevTimeseriesType.current = timeseriesType
    });

    function hoverHighlight(d) {
        var curveNumber = d.points[0].curveNumber
        const trace = timeSeriesRef.current.props.data[curveNumber]

        if (trace.line.color === highlightableColor) {
            trace.line.color = highlightColor
            trace.line.width = 2.5
            timeSeriesRef.current.props.data.splice(curveNumber, 1)
            timeSeriesRef.current.props.data.splice(-5, 0, trace)
            setRevision(revision + 1);
            timeSeriesRef.current.props.layout.datarevision = revision;
        }
    }

    function hoverReset(d) {
        for (var i = 0; i < timeSeriesRef.current.props.data.length; i++) {
            const trace = timeSeriesRef.current.props.data[i]
            if (trace.line.color === highlightColor) {
                trace.line.color = highlightableColor
                trace.line.width = 1
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

export default TimeSeries