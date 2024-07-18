import { domVar } from './Variables.js';
import { Theme, History } from './Theme.js';
import { Watch } from './Watch.js';
import { Type } from './Type.js';
import { Timer } from './TImer.js';
import { TimePicker } from './TimePicker.js';

const theme = new Theme();
theme.update();

const timer = new Timer();
timer.fillUL();

let watch       = null,
    isFirstPass = true,
    isLapWatch  = false,
    isWhidden   = Array(5).fill(true),
    isThidden   = [true, false, false, false, true, false];

domVar.timeType.addEventListener('change', checkTimeType);


for(let i = 1; i < 4; i++) {
    let parent = domVar[`innerScroll${i}`];
    let scroller = domVar[`time${i}`];

    let timePicker;
    if(i === 1)
        timePicker = new TimePicker(parent, scroller, domVar.hours);
    else if(i == 2)
        timePicker = new TimePicker(parent, scroller, domVar.minutes);
    else
        timePicker = new TimePicker(parent, scroller, domVar.seconds);

    scroller.addEventListener('scroll', timePicker.setNearestItem);
}

eventsAction();
function eventsAction() {
    const eventPairs = [
        [domVar.themeDark, themeUpdate],
        [domVar.themeLight, themeUpdate],
        [domVar.start, doStart],
        [domVar.Bstop, doStop],
        [domVar.resume, doResume],
        [domVar.lap, doLap],
        [domVar.reset, doReset],
        [domVar.startTimer, doStartTimer],
        [domVar.pause, doPause],
        [domVar.resumeTimer, doResumeTimer],
        [domVar.cancel, doCancel]
    ];
    
    function eventAction(element, action) {
        element.addEventListener('click', action);
    }
    
    eventPairs.forEach(pair => {
        eventAction(pair[0], pair[1]);
    });
}

function themeUpdate() {
    const history = new History;
    history.mode = history.mode  === "rgb(246, 246, 246)" 
                                   ? "rgba(0, 0, 0, 0.9)" 
                                   : "rgb(246, 246, 246)";

    history.save();

    const theme   = new Theme();
    theme.update();
}

function doStart() {
    watch = new Watch();

    watch.startWatch();

    // false --> hide  ||   true --> show 
    isWhidden = [false, true, false, true, false];
    styleChanger(1);
}

function doStop() {
    watch.stopWatch();

    // false --> hide  ||   true --> show
    isWhidden = [false, false, true, false, true];
    styleChanger(1);
}

function doResume() {
    watch.resumeWatch();

    // false --> hide  ||   true --> show
    isWhidden = [false, true, false, true, false];
    styleChanger(1);
}

function doReset() {
    watch.resetWatch();

    // false --> hide  ||   true --> show
    isWhidden = [true, false, false, false, false];
    styleChanger(1);
    isLapWatch = false;
}

function doLap() {
    watch.lapWatch(true);
    isLapWatch = true;
}

function styleChanger(set) {
    if(set === 1) {
        doStyleChange(set, 0, domVar.start);
        doStyleChange(set, 1, domVar.Bstop);
        doStyleChange(set, 2, domVar.resume);
        doStyleChange(set, 3, domVar.lap);
        doStyleChange(set, 4, domVar.reset);
    } else {
        doStyleChange(set, 0, domVar.startTimer);
        doStyleChange(set, 1, domVar.resumeTimer);
        doStyleChange(set, 2, domVar.cancel);
        doStyleChange(set, 3, domVar.pause);
        doStyleChange(set, 4, domVar.beforeStart);
        doStyleChange(set, 5, domVar.startRun);
    }
}

function doStyleChange(set, index, element) {
    const toToggle = new Watch;

    if(set === 1)
        toToggle.toggleVisibility(element, isWhidden[index]);
    else
        toToggle.toggleVisibility(element, isThidden[index]);
}

export function checkTimeType() {
    const type = new Type(watch, isFirstPass, isLapWatch, isThidden[4], isThidden[5]);
    type.doToggle(); 
    isFirstPass = false;
}

function doStartTimer() {
    const isDefault = isTimerDefault();

    if (!isDefault) {
        isThidden = [false, false, true, true, false, true];
        styleChanger(2);
        timer.doStartTimer();
    } else 
        alert("Please set a non-default time before starting.");
}

function doResumeTimer() {
    isThidden = [false, false, true, true, false, true];
    styleChanger(2);
    timer.doResumeTimer();
}

export function doCancel() {
    isThidden = [true, false, false, false, true, false];
    styleChanger(2);

    timer.cancelTimer();
}

function doPause() {
    isThidden = [false, true, true, false, false, true];
    styleChanger(2);
    timer.doPauseTimer();
}

function isTimerDefault() {
    const hours    = domVar.hours.textContent.trim()  === '00';
    const minutes  = domVar.minutes.textContent.trim()  === '00';
    const seconds = domVar.seconds.textContent.trim()  === '00';

    if(!hours || !minutes || !seconds)
        return false;

    return true;
}   