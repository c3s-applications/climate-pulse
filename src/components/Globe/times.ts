
const compareDayOfMonth = (
    dateOne: Date,
    dateTwo: Date,
    comparison: Function,
) => (
    comparison(dateOne.getDate(), dateTwo.getDate())
)

const validMonth = (
        month: number,
        currentDateTime: Date,
        minDateTime: Date,
        maxDateTime: Date,
        temporalResolution="monthly",
) => (
    (
        (currentDateTime.getFullYear() === maxDateTime.getFullYear())
        && (month <= maxDateTime.getMonth())
        && (
            (temporalResolution === "daily")
            ? compareDayOfMonth(currentDateTime, maxDateTime, (a, b) => (a >= b))
            : true)
    )
)