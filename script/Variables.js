const query      = className => document.querySelector(className);
const queryID    = className => document.getElementById(className);
const queryAll   = className => document.querySelectorAll(className);

// Export the variables related to DOM Query
export const domVar = {
    jsTimeContainer : queryID("jsTimeContainer"),
    timerContainer  : query(".timerContainer"),
    timeCounterLap  : query(".timeCounterLap"),
    buttonsTimer    : query(".buttonsTimer"),
    innerScroll1    : query(".innerScroll1"),
    innerScroll2    : query(".innerScroll2"),
    innerScroll3    : query(".innerScroll3"),
    timeCounter     : query(".timeCounter"),
    resumeTimer     : query(".resumeTimer"),
    beforeStart     : query(".beforeStart"),
    startTimer      : query(".startTimer"),
    themeLight      : query(".themeLight"),
    themeDark       : query(".themeDark"),
    timeType        : queryID("timeType"),
    dateWeek        : query(".dateWeek"),
    startRun        : query(".startRun"),
    lapData         : query(".lapData"),
    buttons         : query(".buttons"),
    minutes         : query(".minutes"),
    seconds         : query(".seconds"),
    jsLaps          : query(".jsLaps"),
    resume          : query(".resume"),
    cancel          : query(".cancel"),
    timeUl          : queryAll("ul"),
    circle          : query(".circle"),
    clock           : query(".clock"),  
    time1           : query(".time1"),
    hours           : query(".hours"),
    time2           : query(".time2"),
    time3           : query(".time3"),    
    reset           : query(".reset"),
    start           : query(".start"),
    light           : query(".light"),
    pause           : query(".pause"),
    Bstop           : query(".stop"),
    dark            : query(".dark"),
    lap             : query(".lap")
};

export const colors = {
    default: {
        buttonColor: "rgb(61, 60, 64)",
        textColor  : "white",
        buttonBg   : "white",
        bgColor    : "rgba(0, 0, 0, 0.9)",
        shadow     : "rgba(255, 255, 255, 0.5)",
        filter     : "rgba(255, 255, 255, 1)",
        fill       : "rgba(255, 255, 255, 0.5)",
        shad1      : "#ffffff",
        shad2      : "#000000"
    },

    nonDefault: {
        buttonColor: "white",
        textColor  : "black",
        buttonBg   : "rgb(61, 60, 64)",
        bgColor    : "rgb(246, 246, 246)",
        shadow     : "rgba(0, 0, 0, 0.5)",
        filter     : "rgba(0, 0, 0, 0.6)",
        fill       : "rgba(255, 255, 255, 0.8)",
        shad1      : "#000000",
        shad2      : "#ffffff"
    }
};