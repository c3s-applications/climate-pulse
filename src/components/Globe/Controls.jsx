import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { updateGlobe } from "../../actions/actions"
import { Button, Icon, Popup, Dropdown } from 'semantic-ui-react'


const non31DayMonths = [1, 3, 5, 8, 10]

const GlobeControls = () => {

    const dispatch = useDispatch();

    const variable = useSelector(state => state.variable);
    const quantity = useSelector(state => state.globe.quantity);

    const dateTime = useSelector(state => state.globe.dateTime);

    const maxDaily = useSelector(state => state.globe.maxDaily);
    const minDaily = useSelector(state => state.globe.minDaily);
    const maxMonthly = useSelector(state => state.globe.maxMonthly);
    const minMonthly = useSelector(state => state.globe.minMonthly);
    const maxAnnual = useSelector(state => state.globe.maxAnnual);
    const minAnnual = useSelector(state => state.globe.minAnnual);
    
    const temporalResolution = useSelector(state => state.globe.temporalResolution)

    const maxDate = (res=temporalResolution) => {
        switch (res) {
            case 'daily':
                return maxDaily
            case 'monthly':
                return maxMonthly
            case 'annual':
                return maxAnnual
        }
    }

    const minDate = (res=temporalResolution) => {
        switch (res) {
            case 'daily':
                return minDaily
            case 'monthly':
                return minMonthly
            case 'annual':
                return minAnnual
        }
    }

    const temporalResolutions = [
        {key: 'daily', text: 'Daily', value: 'daily'},
        {key: 'monthly', text: 'Monthly', value: 'monthly'},
        {key: 'annual', text: 'Annual', value: 'annual'},
    ]

    const days = [
        {key: 1, text: '1', value: 1, disabled: invalidDay(1)},
        {key: 2, text: '2', value: 2, disabled: invalidDay(2)},
        {key: 3, text: '3', value: 3, disabled: invalidDay(3)},
        {key: 4, text: '4', value: 4, disabled: invalidDay(4)},
        {key: 5, text: '5', value: 5, disabled: invalidDay(5)},
        {key: 6, text: '6', value: 6, disabled: invalidDay(6)},
        {key: 7, text: '7', value: 7, disabled: invalidDay(7)},
        {key: 8, text: '8', value: 8, disabled: invalidDay(8)},
        {key: 9, text: '9', value: 9, disabled: invalidDay(9)},
        {key: 10, text: '10', value: 10, disabled: invalidDay(10)},
        {key: 11, text: '11', value: 11, disabled: invalidDay(11)},
        {key: 12, text: '12', value: 12, disabled: invalidDay(12)},
        {key: 13, text: '13', value: 13, disabled: invalidDay(13)},
        {key: 14, text: '14', value: 14, disabled: invalidDay(14)},
        {key: 15, text: '15', value: 15, disabled: invalidDay(15)},
        {key: 16, text: '16', value: 16, disabled: invalidDay(16)},
        {key: 17, text: '17', value: 17, disabled: invalidDay(17)},
        {key: 18, text: '18', value: 18, disabled: invalidDay(18)},
        {key: 19, text: '19', value: 19, disabled: invalidDay(19)},
        {key: 20, text: '20', value: 20, disabled: invalidDay(20)},
        {key: 21, text: '21', value: 21, disabled: invalidDay(21)},
        {key: 22, text: '22', value: 22, disabled: invalidDay(22)},
        {key: 23, text: '23', value: 23, disabled: invalidDay(23)},
        {key: 24, text: '24', value: 24, disabled: invalidDay(24)},
        {key: 25, text: '25', value: 25, disabled: invalidDay(25)},
        {key: 26, text: '26', value: 26, disabled: invalidDay(26)},
        {key: 27, text: '27', value: 27, disabled: invalidDay(27)},
        {key: 28, text: '28', value: 28, disabled: invalidDay(28)},
        {key: 29, text: '29', value: 29, disabled: invalidDay(29)},
        {key: 30, text: '30', value: 30, disabled: invalidDay(30)},
        {key: 31, text: '31', value: 31, disabled: invalidDay(31)},
    ]

    const months = [
        {key: "jan", text: "January", value: 0, active: dateTime.getMonth()===0, disabled: invalidMonth(0)},
        {key: "feb", text: "February", value: 1, active: dateTime.getMonth()===1, disabled: invalidMonth(1)},
        {key: "mar", text: "March", value: 2, active: dateTime.getMonth()===2, disabled: invalidMonth(2)},
        {key: "apr", text: "April", value: 3, active: dateTime.getMonth()===3, disabled: invalidMonth(3)},
        {key: "may", text: "May", value: 4, active: dateTime.getMonth()===4, disabled: invalidMonth(4)},
        {key: "jun", text: "June", value: 5, active: dateTime.getMonth()===5, disabled: invalidMonth(5)},
        {key: "jul", text: "July", value: 6, active: dateTime.getMonth()===6, disabled: invalidMonth(6)},
        {key: "aug", text: "August", value: 7, active: dateTime.getMonth()===7, disabled: invalidMonth(7)},
        {key: "sep", text: "September", value: 8, active: dateTime.getMonth()===8, disabled: invalidMonth(8)},
        {key: "oct", text: "October", value: 9, active: dateTime.getMonth()===9, disabled: invalidMonth(9)},
        {key: "nov", text: "November", value: 10, active: dateTime.getMonth()===10, disabled: invalidMonth(10)},
        {key: "dec", text: "December", value: 11, active: dateTime.getMonth()===11, disabled: invalidMonth(11)},
    ]

    const years = () => {
        var step = 1
        var result = []
        var start = minDate().getFullYear()
        var stop = maxDate().getFullYear() + 1
    
        for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
            let label = i.toString()
            result.push(
                {
                    key: i,
                    text: label,
                    value: i,
                    disabled: invalidYear(i)
                });
        }
        return result;
    };

    function invalidDay(day) {
        return (
            (non31DayMonths.includes(dateTime.getMonth()) && day===31) ||
            (dateTime.getMonth()===1 && day>=29) ||
            (
                (dateTime.getFullYear() === maxDate().getFullYear()) &&
                (dateTime.getMonth() === maxDate().getMonth()) &&
                (day > maxDate().getDate())
            ) || (
                (dateTime.getFullYear() === minDate().getFullYear()) &&
                (dateTime.getMonth() === minDate().getMonth()) &&
                (day < minDate().getDate())
            )
        )
    }

    function invalidMonth(month) {
        return (
            (
                (dateTime.getFullYear() === maxDate().getFullYear()) &&
                (month > maxDate().getMonth())
            ) || (
                (dateTime.getFullYear() === minDate().getFullYear()) &&
                (month < minDate().getMonth())
            )
        )
    }

    function invalidYear(year) {
        switch (temporalResolution) {
            case 'monthly':
                return (
                    (
                        (year === maxDate().getFullYear()) &&
                        (dateTime.getMonth() > maxDate().getMonth())
                    ) || (
                        (year === minDate().getFullYear()) &&
                        (dateTime.getMonth() < minDate().getMonth())
                    )
                )
            case 'daily':
                return (
                    (
                        (year === maxDate().getFullYear()) &&
                        (
                            (dateTime.getMonth() > maxDate().getMonth()) ||
                            (
                                (dateTime.getMonth() == maxDate().getMonth()) &&
                                (dateTime.getDate() > maxDate().getDate())
                            )
                        )
                    ) || (
                        (year === minDate().getFullYear()) &&
                        (
                            (dateTime.getMonth() < minDate().getMonth()) ||
                            (
                                (dateTime.getMonth() == minDate().getMonth()) &&
                                (dateTime.getDate() < minDate().getDate())
                            )
                        )
                    )
                )
            default:
                return false
        }
    }

    function updateMonth(event, data) {
        var month = data.value
        dispatch(updateGlobe({dateTime: new Date(dateTime.getFullYear(), month, dateTime.getDate())}))
    }

    function updateDay(event, data) {
        var day = data.value
        dispatch(updateGlobe({dateTime: new Date(dateTime.getFullYear(), dateTime.getMonth(), day)}))
    }

    function updateYear(event, data) {
        var year = data.value
        dispatch(updateGlobe({dateTime: new Date(year, dateTime.getMonth(), dateTime.getDate())}))
    }


  
    function jumpToDate(date, res=temporalResolution) {
        console.log(minDate(res))
        if (date > maxDate(res)) {
            date = maxDate(res)
        } else if (date < minDate(res)) {
            date = minDate(res)
        }
        dispatch(updateGlobe({dateTime: date}))
    }
  
    function incrementDay(days) {      
      var result = new Date(dateTime);
      result.setDate(result.getDate() + days);
    
      if (result.getMonth()===1 && result.getDate()===29) {
        if (days < 0) {
            result.setDate(result.getDate() - 1);
        } else {
            result.setDate(result.getDate() + 1);
        }
      }

      if (result > maxDate()) {
        result = maxDate()
      } else if (result < minDate()) {
        result = minDate()
      }

      jumpToDate(result)
    }
  
    function incrementMonth(months) {      
      var result = new Date(dateTime);
      result.setMonth(result.getMonth() + months);

      if (result > maxDate()) {
        result = maxDate()
      } else if (result < minDate()) {
        result = minDate()
      }

      jumpToDate(result)
    }
  
    function incrementYear(year) {      
      var result = new Date(dateTime.getFullYear() + year, dateTime.getMonth(), dateTime.getDate());

      if (result > maxDate()) {
        result = maxDate()
      } else if (result < minDate()) {
        result = minDate()
      }

      jumpToDate(result)
    }

    const bigNegative = () => {
        switch(temporalResolution) {
            case 'daily':
                return {
                    onClick: () => incrementDay(-5),
                    content: <><Icon name='angle double left' />5 days</>,
                }
            case 'monthly':
                return {
                    onClick: () => incrementMonth(-12),
                    content: <><Icon name='angle double left' />12 months</>,
                }
            case 'annual':
                return {
                    onClick: () => incrementYear(-5),
                    content: <><Icon name='angle double left' />5 years</>,
                }
        }
    }

    const bigPositive = () => {
        switch(temporalResolution) {
            case 'daily':
                return {
                    onClick: () => incrementDay(5),
                    content: <><Icon name='angle double right' />5 days</>,
                }
            case 'monthly':
                return {
                    onClick: () => incrementMonth(12),
                    content: <><Icon name='angle double right' />12 months</>,
                }
            case 'annual':
                return {
                    onClick: () => incrementYear(5),
                    content: <><Icon name='angle double right' />5 years</>,
                }
        }
    }

    const smallNegative = () => {
        switch(temporalResolution) {
            case 'daily':
                return {
                    onClick: () => incrementDay(-1),
                    content: <><Icon name='angle left' />1 day</>,
                }
            case 'monthly':
                return {
                    onClick: () => incrementMonth(-1),
                    content: <><Icon name='angle left' />1 month</>,
                }
            case 'annual':
                return {
                    onClick: () => incrementYear(-1),
                    content: <><Icon name='angle left' />1 year</>,
                }
        }
    }

    const smallPositive = () => {
        switch(temporalResolution) {
            case 'daily':
                return {
                    onClick: () => incrementDay(1),
                    content: <><Icon name='angle right' />1 day</>,
                }
            case 'monthly':
                return {
                    onClick: () => incrementMonth(1),
                    content: <><Icon name='angle right' />1 month</>,
                }
            case 'annual':
                return {
                    onClick: () => incrementYear(1),
                    content: <><Icon name='angle right' />1 year</>,
                }
        }
    }

    useEffect(() => {
        console.log("JUMPING")
        jumpToDate(dateTime)
    }, [dateTime])

    return (
        <>
            <Button.Group basic size='mini' color='teal'>
                <Button
                    icon
                    disabled={dateTime <= minDate()}
                    {...bigNegative()}
                />
                <Button
                    icon
                    disabled={dateTime <= minDate()}
                    {...smallNegative()}
                />
                <Button
                    icon
                    disabled={dateTime >= maxDate()}
                    {...smallPositive()}
                />
                <Button
                    icon
                    disabled={dateTime >= maxDate()}
                    {...bigPositive()}
                />
            </Button.Group>&nbsp;
            <Button.Group size='mini' basic color='teal'>
                <Button
                    size='mini'
                    onClick={() => jumpToDate(maxDate())}
                >
                    Latest
                </Button>
                <Popup
                    textAlign='left'
                    on='click'
                    size='mini'
                    flowing
                    hoverable={false}
                    hideOnScroll={false}
                    trigger={
                        <Button size='mini' >
                            Select date
                        </Button>
                    }
                >
                    Select date<br></br>
                    { temporalResolution === 'daily' &&
                        <>
                        <Dropdown
                            options={days}
                            selection
                            compact
                            style={{minWidth: "80px"}}
                            pinned
                            defaultValue={dateTime.getDate()}
                            onChange={updateDay}
                        />&nbsp;
                        </>
                    }
                    { temporalResolution !== 'annual' &&
                        <>
                        <Dropdown
                            options={months}
                            selection
                            compact
                            style={{minWidth: "150px"}}
                            pinned
                            defaultValue={dateTime.getMonth()}
                            onChange={updateMonth}
                        />&nbsp;
                        </>
                    }
                    <Dropdown
                        options={years()}
                        selection
                        compact
                        style={{minWidth: "80px"}}
                        pinned
                        defaultValue={dateTime.getFullYear()}
                        onChange={updateYear}
                    />
                </Popup>
            </Button.Group>
            &nbsp;
            <Dropdown
                options={temporalResolutions}
                as={Button}
                selection
                compact
                basic
                color='blue'
                size='mini'
                style={{minWidth: "80px"}}
                pinned
                defaultValue={temporalResolution}
                onChange={(e, data) => {
                    dispatch(updateGlobe({temporalResolution: data.value, dateTime: new Date(dateTime)}))
                }}
            />
        </>
    )
}

export default GlobeControls