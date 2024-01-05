import React, { useState } from 'react'
import { connect } from 'react-redux'
import { updateSettings } from "../actions/actions"
import { Icon, Dropdown, Label, Popup, Button } from 'semantic-ui-react'

const sortByOptions = [
    {key: 'hottest', text: 'Warmest to coldest', value: 'hottest'},
    {key: 'ascending', text: 'Ascending', value: 'ascending'},
    {key: 'descending', text: 'Descending', value: 'descending'},
]

const averageSsts = {
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

const averageTemps = {
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

function TimeSeriesYearComparison(props) {
    const currentYears = props.controls.currentYears
    const [sortYears, setSortYears] = useState('hottest')

    function getStartYear() {
        if (props.controls.variable === 'air-temperature') {
            return 1940
        } else {
            return 1979
        }
    }

    function getValues() {
        if (props.controls.variable === 'air-temperature') {
            return averageTemps
        } else {
            return averageSsts
        }
    }

    function yearRange(start, stop) {
        var step = 1
        var result = []
    
        for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
            let label = i.toString()
            result.push(
                {
                    key: i,
                    text: label,
                    value: label,
                    // disabled: (currentYears.length >= 5),
                    temp: getValues()[label],
                    description: ((Math.round(getValues()[label] * 100) / 100).toFixed(2)).toString().concat('°C'),
                    
                });
        }
    
        if (sortYears === 'hottest') {
            result = result.sort(function(a, b){return b.temp - a.temp})
        } else if (sortYears === 'descending') {
            result = result.sort(function(a, b){return b.key - a.key})
        } else if (sortYears === 'ascending') {
            result = result.sort(function(a, b){return a.key - b.key})
        }

        return result;
    };

    function callUpdateSettings() {
      const { controls, dispatch } = props
  
      dispatch(
        updateSettings({
          settings: controls.settings
        })
      )
    }

    function updateYears(event, data) {
        const { controls } = props
        controls['currentYears'] = data.value
        callUpdateSettings()
    }

    function resetChart(event, data) {
        props.controls['resetChart'] = true
        callUpdateSettings()
    }
    
    function renderLabel(label) {
        const currentYears = props.controls.currentYears
        var result = {content: `${label.text}`}
        var idx = currentYears.indexOf(label.text)

        return result
    }

    return (
        <>
        <Popup
            textAlign='left'
            trigger={<Button basic color='teal' size='mini'><Icon name='plus'/>Add years to compare with <span style={{color: '#941333', fontWeight: 'bold'}}>{props.controls.maxDate.getFullYear()}</span></Button>}
            on='click'
            size='mini'
            hoverable={false}
            style={{minWidth: "300px"}}
            hideOnScroll={false}
        >            
            <Label.Group>              
                    <Icon name='sort' />
                    Sort years by &nbsp;
                <Label>
                    <Dropdown
                        options={sortByOptions}
                        defaultValue={sortYears}
                        onChange={function(e, data){setSortYears(data.value)}}
                    />
                </Label>
                
            </Label.Group>
                <Dropdown
                    placeholder='Select years'
                    fluid
                    multiple
                    selection
                    search
                    clearable
                    options={yearRange(getStartYear(), props.controls.maxDate.getFullYear())}
                    defaultValue={currentYears}
                    renderLabel={renderLabel}
                    onChange={updateYears}
                />
            </Popup>
            <Button
                color='teal'
                size='mini'
                onClick={resetChart}
            >
                <Icon name='undo' />
                Reset chart
            </Button> 
            </>
    )

}
  

const mapStateToProps = state => {
    const controls = state.controls
    return {
        controls
    }
}

export default connect(mapStateToProps)(TimeSeriesYearComparison)