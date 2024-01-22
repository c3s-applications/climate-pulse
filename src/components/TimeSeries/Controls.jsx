import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateTimeSeries } from "../../actions/actions"
import { Icon, Dropdown, Label, Popup, Button, Divider } from 'semantic-ui-react'
import { getStartYear, yearRange } from './AnnualValues'

const sortByOptions = [
    {key: 'hottest', text: 'Warmest to coldest', value: 'hottest'},
    {key: 'ascending', text: 'Ascending', value: 'ascending'},
    {key: 'descending', text: 'Descending', value: 'descending'},
]

const TimeSeriesControls = () => {

    const dispatch = useDispatch()

    const maxDate = useSelector(state => state.maxDate)
    const variable = useSelector(state => state.variable)
    const highlightYears = useSelector(state => state.timeSeries.highlightYears)
    const reset = useSelector(state => state.timeSeries.reset)
    const [sortYears, setSortYears] = useState('hottest')

    const sortedYearRange = (start, stop) => {
        let result = yearRange(start, stop, variable)
    
        if (sortYears === 'hottest') {
            result = result.sort(function(a, b){return b.temp - a.temp})
        } else if (sortYears === 'descending') {
            result = result.sort(function(a, b){return b.key - a.key})
        } else if (sortYears === 'ascending') {
            result = result.sort(function(a, b){return a.key - b.key})
        }

        return result
    }

    return (
        <>
        <Popup
            trigger={
                <Button basic color='teal' size='small'>
                    <Icon name='plus'/>Add years to compare with &nbsp;
                    <span style={{color: '#941333', fontWeight: 'bold'}}>
                        {maxDate.getFullYear()}
                    </span>
                </Button>
            }
            on='click'
            size='small'
            hoverable={false}
            style={{minWidth: "300px"}}
            hideOnScroll={false}
        >            
            <Label.Group>              
                    Sort years by &nbsp;
                    <Dropdown
                        as={Button}
                        compact
                        color='teal'
                        size='small'
                        options={sortByOptions}
                        defaultValue={sortYears}
                        onChange={function(e, data){setSortYears(data.value)}}
                    />
                
            </Label.Group>
            <Divider fitted hidden />
                <Dropdown
                    placeholder='Select years'
                    fluid
                    multiple
                    selection
                    search
                    clearable
                    options={
                        sortedYearRange(
                            getStartYear(variable),
                            maxDate.getFullYear(),
                        )
                    }
                    defaultValue={highlightYears}
                    onChange={(e, data) => {
                        dispatch(updateTimeSeries({highlightYears: data.value}))
                    }}
                />
            </Popup>
            <Button
                icon
                color='teal'
                size='small'
                onClick={() => dispatch(updateTimeSeries({reset: reset+1}))}
            >
                <Icon name='undo' />
            </Button> 
            </>
    )

}


export default TimeSeriesControls