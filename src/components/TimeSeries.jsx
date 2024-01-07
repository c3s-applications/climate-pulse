import React, { useState, useEffect, useRef } from "react"
import { useSelector, connect } from 'react-redux';
import { updateSettings } from "../actions/actions"
import Plot from 'react-plotly.js'

const excludeButtons = [
    'zoom', 'pan', 'zoomIn', 'zoomOut', 'select', 'lasso2d', 'resetScale',
    'autoScale', 'toImage',
];

function getSorter(variable) {
    if (variable === 'air-temperature') {
        return {
            '1940': 13.690327868852458,
            '1941': 13.73841095890411,
            '1942': 13.648657534246576,
            '1943': 13.653369863013697,
            '1944': 13.840983606557378,
            '1945': 13.707150684931506,
            '1946': 13.708876712328767,
            '1947': 13.753506849315068,
            '1948': 13.68846994535519,
            '1949': 13.725780821917807,
            '1950': 13.614602739726028,
            '1951': 13.748493150684931,
            '1952': 13.725546448087432,
            '1953': 13.807369863013697,
            '1954': 13.610575342465753,
            '1955': 13.593397260273973,
            '1956': 13.52898907103825,
            '1957': 13.782109589041097,
            '1958': 13.848027397260273,
            '1959': 13.813095890410958,
            '1960': 13.763060109289617,
            '1961': 13.842410958904109,
            '1962': 13.782383561643835,
            '1963': 13.819671232876713,
            '1964': 13.603196721311477,
            '1965': 13.671041095890411,
            '1966': 13.748054794520549,
            '1967': 13.76350684931507,
            '1968': 13.694890710382513,
            '1969': 13.830986301369864,
            '1970': 13.803890410958905,
            '1971': 13.650739726027398,
            '1972': 13.781967213114754,
            '1973': 13.887424657534247,
            '1974': 13.614109589041094,
            '1975': 13.637150684931507,
            '1976': 13.564535519125682,
            '1977': 13.854986301369863,
            '1978': 13.796191780821918,
            '1979': 13.95323287671233,
            '1980': 14.07756830601093,
            '1981': 14.116328767123289,
            '1982': 13.917068493150683,
            '1983': 14.110821917808218,
            '1984': 13.895327868852458,
            '1985': 13.859835616438357,
            '1986': 13.946931506849316,
            '1987': 14.10254794520548,
            '1988': 14.130710382513662,
            '1989': 14.016027397260276,
            '1990': 14.249342465753426,
            '1991': 14.19227397260274,
            '1992': 13.956420765027323,
            '1993': 14.00654794520548,
            '1994': 14.044657534246577,
            '1995': 14.218931506849314,
            '1996': 14.086420765027322,
            '1997': 14.213863013698631,
            '1998': 14.40076712328767,
            '1999': 14.131369863013699,
            '2000': 14.122868852459018,
            '2001': 14.28890410958904,
            '2002': 14.38476712328767,
            '2003': 14.372547945205477,
            '2004': 14.304535519125682,
            '2005': 14.473068493150684,
            '2006': 14.424027397260275,
            '2007': 14.41690410958904,
            '2008': 14.281120218579236,
            '2009': 14.415698630136985,
            '2010': 14.51,
            '2011': 14.370082191780822,
            '2012': 14.416038251366121,
            '2013': 14.447123287671232,
            '2014': 14.488164383561644,
            '2015': 14.63676712328767,
            '2016': 14.813934426229507,
            '2017': 14.72358904109589,
            '2018': 14.644301369863014,
            '2019': 14.78027397260274,
            '2020': 14.806639344262294,
            '2021': 14.65564383561644,
            '2022': 14.68186301369863,
            '2023': 14.982740,
        }
    } else {
        return {
            '1979': 20.161315068493153,
            '1980': 20.16428961748634,
            '1981': 20.11068493150685,
            '1982': 20.140246575342466,
            '1983': 20.20145205479452,
            '1984': 20.062295081967214,
            '1985': 20.012109589041096,
            '1986': 20.062520547945205,
            '1987': 20.23345205479452,
            '1988': 20.143032786885247,
            '1989': 20.085424657534247,
            '1990': 20.232821917808216,
            '1991': 20.226246575342465,
            '1992': 20.094726775956286,
            '1993': 20.11635616438356,
            '1994': 20.121342465753425,
            '1995': 20.212027397260275,
            '1996': 20.14590163934426,
            '1997': 20.33268493150685,
            '1998': 20.403972602739724,
            '1999': 20.185945205479452,
            '2000': 20.224398907103826,
            '2001': 20.335123287671234,
            '2002': 20.341671232876713,
            '2003': 20.373671232876713,
            '2004': 20.357622950819675,
            '2005': 20.38323287671233,
            '2006': 20.362246575342468,
            '2007': 20.277698630136985,
            '2008': 20.286666666666665,
            '2009': 20.425095890410958,
            '2010': 20.416438356164385,
            '2011': 20.289753424657533,
            '2012': 20.369125683060112,
            '2013': 20.389890410958905,
            '2014': 20.46504109589041,
            '2015': 20.567616438356165,
            '2016': 20.61445355191257,
            '2017': 20.55482191780822,
            '2018': 20.512465753424657,
            '2019': 20.600931506849314,
            '2020': 20.595081967213115,
            '2021': 20.542931506849314,
            '2022': 20.54208219178082,
            '2023': 20.797780821917808,
        }
    }
}

function santiseYears(variable, years) {
    if (variable === 'air-temperature') {
        return years
    } else {
        return years.filter(function(x) {
            return x >= 1979
        });
    }
}


const highlightableColor = '#e6e6e6'
const highlightColor = 'grey'

const colorChoices = ['#d01f27', '#d22527', '#d52b28', '#d73228', '#da3828', '#dc3e29', '#df4429', '#e14b2a', '#e4512a', '#e6572a', '#e95d2b', '#eb642b', '#ee6a2b', '#f0702c', '#f2762c', '#f57d2c', '#f7832d', '#f9882e', '#f98c31', '#fa9033', '#fa9436', '#fa9738', '#fa9b3b', '#fb9f3e', '#fba340', '#fba743', '#fbaa46', '#fbae48', '#fcb24b', '#fcb64e', '#fcb950', '#fcbd53', '#fdc155', '#fdc558', '#fdc85d', '#fdca63', '#fdcd69', '#fdd06f', '#fdd275', '#fdd57b', '#fdd881', '#fdda87', '#fddd8c', '#fde092', '#fde298', '#fde59e', '#fde7a4', '#fdeaaa', '#fdedb0', '#fdefb6', '#c7e9f8', '#c4e7f7', '#c0e5f6', '#bde3f6', '#b9e1f5', '#b5dff4', '#b2ddf3', '#aedbf2', '#abd9f1', '#a7d7f1', '#a3d5f0', '#a0d3ef', '#9cd0ee', '#99ceed', '#95ccec', '#91caec', '#8ec8eb', '#8ac6ea', '#87c4e9', '#83c2e8', '#7fc0e7', '#7cbee7', '#78bce6', '#75bae5', '#71b8e4', '#6eb4e1', '#6bb0df', '#68acdc', '#65a8d9', '#61a4d7', '#5ea0d4', '#5b9cd1', '#5898cf', '#5594cc', '#5290c9', '#4f8cc7', '#4c88c4', '#4885c1', '#4581be', '#427dbc', '#3f79b9', '#3c75b6', '#3971b4', '#366db1', '#3369ae', '#2f65ac', '#2c61a9', '#295da6', '#2659a4', '#2355a1']

function chooseColors(nColors) {
    if (nColors === 1) {
        return ["#f0702c"]
    } else if (nColors === 3) {
        return ["#d01f27", "FDC659", "#2355a1"]
    } else {
        var result = []
        for (var i = 0; i < nColors; i++) {
            var color = colorChoices[Math.floor((colorChoices.length-1)*(i/(nColors-1)))]
            console.log(color)
            result.push(color)
        }
        console.log(result)
        return result
    }
}

function TimeSeries(props) {

    const variable = useSelector(state => state.controls.variable);
    const prevVariable = useRef();

    const timeSeriesRef = useRef();
    const [revision, setRevision] = useState(0);
    const [plotlyData, setPlotlyData] = useState(null);
    const [plotlyLayout, setPlotlyLayout] = useState(null);
    const [plotlyStyle, setPlotlyStyle] = useState(null);
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
        props.controls['currentYears'] = props.controls.defaultCurrentYears
        callUpdateSettings()
    }

    function handleUpdateSettings(setting, value) {
        props.controls[setting] = value
        callUpdateSettings()
    }

    function getDefaultHeight() {
        if (window.innerWidth < 768) {
            return 400
        } else {
            return 527
        }
    }

    function updateSrc() {
        if (props.controls.timeSeriesLoaded) {
            handleUpdateSettings('timeSeriesLoaded', false)
        }
        fetch(jsonSrc)
            .then( resp => resp.json())
            .then((data)=> {
                setPlotlyData(data.data)
                data.layout["height"] = getDefaultHeight()
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
            updateSrc()
            setReset(false)
        }

        if (timeSeriesRef.current.props.data !== null && currentYears !== prevCurrentYears.current) {

            if (typeof prevCurrentYears.current !== 'undefined') {
                for (var i = 0; i < prevCurrentYears.current.length; i++) {
                    if (santiseYears(props.controls.variable, prevCurrentYears.current).includes(prevCurrentYears.current[i])) {
                        timeSeriesRef.current.props.data.splice(timeSeriesRef.current.props.data.length-4, 1)
                    }
                }

                applyHighlights()
                setHighlightsApplied(true)
            }
            prevCurrentYears.current = currentYears
                
        }
    });

    function applyHighlights() {
        if (timeSeriesRef.current.props.data !== null) {
            var sortedYears = santiseYears(props.controls.variable, currentYears)
            var sorter = getSorter(props.controls.variable)
            sortedYears.sort(function(a, b){return sorter[b]-sorter[a]})
            var addedColors = chooseColors(sortedYears.length)
            console.log(currentYears)
            for (var i = 0; i < sortedYears.length; i++) {
                var currentYear = sortedYears[i]
                var traceIndex = currentYear-getStartYear()
                if (traceIndex >= 0) {
                    const trace = timeSeriesRef.current.props.data[traceIndex]
                    var newTrace = {
                        x: trace.x,
                        y: trace.y,
                        line: {color: addedColors[i], width: 2},
                        hovertemplate: "<b>" + currentYear.toString() + " - %{x|%B %-d}</b><br>Temperature: %{y}°C<br>1991-2020 average: %{customdata[0]:.2f}°C<br>Anomaly: %{customdata[1]:.2f}°C<extra></extra>",
                        customdata: trace.customdata,
                        name: currentYear.toString(),
                    }
                    timeSeriesRef.current.props.data.splice(-3, 0, newTrace)
                }
            }
            setRevision(revision + 1);
            timeSeriesRef.current.props.layout.datarevision = revision;
            timeSeriesRef.current.handlers.Relayout()
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
        // var year = d.points[0].data.name
        // if (["2023", "2024"].includes(year)) {
        //     if (year.length > 4) {
        //         year = d.points[0].curveNumber + getStartYear()
        //         if (year === 2026) {
        //             year = 2023
        //         }
        //     }
        //     var dayOfYear = d.points[0].pointIndex + 1
        //     if (year % 4 === 0 && dayOfYear > 59) {
        //         dayOfYear = dayOfYear + 1
        //     }
        //     var date = new Date(new Date(year, 0).setDate(dayOfYear))

        //     handleUpdateSettings('globeTime', date)
        //     hoverReset(d)
        // }
        var traceYear = d.points[0].curveNumber + getStartYear()
        if (traceYear < 2024 && !currentYears.includes(traceYear.toString())) {
            handleUpdateSettings('currentYears', currentYears.concat(traceYear.toString()))
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
                // onHover={hoverHighlight}
                // onUnhover={hoverReset}
                onClick={setTime}
                onRelayout={function(){
                    if (!props.controls.timeSeriesLoaded) {
                        handleUpdateSettings('timeSeriesLoaded', true)
                    }
                }}
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