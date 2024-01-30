
export const ClickOrTap = ({tapThreshold=991, capitalise=false, ing=false}) => {
    var clickText = "click"
    var ingSuffix = "ing"
    if (window.innerWidth < tapThreshold) {
        clickText = "tap"
        ingSuffix = "ping"
    }
    if (capitalise) {
        clickText = clickText.charAt(0).toUpperCase() + clickText.slice(1);
    }
    if (ing) {
        clickText += ingSuffix
    }
    return clickText
}

export const ClickOrTouch = ({tapThreshold=991, capitalise=false, ing=false}) => {
    var clickText = "click"
    var ingSuffix = "ing"
    if (window.innerWidth < tapThreshold) {
        clickText = "touch"
    }
    if (capitalise) {
        clickText = clickText.charAt(0).toUpperCase() + clickText.slice(1);
    }
    if (ing) {
        clickText += ingSuffix
    }
    return clickText
}

export const ScrollOrPinch = ({tapThreshold=991, capitalise=false, ing=false}) => {
    var clickText = "scroll"
    var ingSuffix = "ing"
    if (window.innerWidth < tapThreshold) {
        clickText = "pinch"
    }
    if (capitalise) {
        clickText = clickText.charAt(0).toUpperCase() + clickText.slice(1);
    }
    if (ing) {
        clickText += ingSuffix
    }
    return clickText
}