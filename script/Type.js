import { domVar } from './Variables.js';
import { Watch }  from './Watch.js';
import { Status } from './Status.js';

export class Type {
    constructor (watch, isFirstPass, isLapWatch, isBeforeStart, isStartRun) {
        this.isFirstPass = isFirstPass;
        this.isLapWatch = isLapWatch;
        this.isBeforeStart = isBeforeStart;
        this.isStartRun = isStartRun;

        this.index    = domVar.timeType.selectedIndex;
        this.watch    = watch;
        this.toToggle = new Watch;

        this.setStatuses(); 
    }

    doToggle() {
        this.buttonState();
        this.toToggle.toggleVisibility(domVar.timerContainer,  this.index === 1);
        this.toToggle.toggleVisibility(domVar.buttonsTimer,    this.index === 1);
    
        this.toToggle.toggleVisibility(domVar.jsTimeContainer, this.index === 0);
        this.toToggle.toggleVisibility(domVar.buttons,         this.index === 0);
    
        if(this.isFirstPass)
            this.toToggle.toggleVisibility(domVar.beforeStart, true);
        else if (this.index === 1) {
            this.toToggle.toggleVisibility(domVar.beforeStart, this.isBeforeStart);
            this.toToggle.toggleVisibility(domVar.startRun, this.isStartRun);
        } else {
            this.toToggle.toggleVisibility(domVar.beforeStart, false);
            this.toToggle.toggleVisibility(domVar.startRun, false);
        }

        if(this.isLapWatch) {
            this.toToggle.toggleVisibility(domVar.timeCounterLap,  this.index === 0);
            this.toToggle.toggleVisibility(domVar.jsLaps,          this.index === 0);
        }
        this.isFirstPass = false;
    }

    setStatuses() {
        this.statuses = {
            wStart:  new Status(domVar.start, 1),
            wStop:   new Status(domVar.Bstop, 2),
            wResume: new Status(domVar.resume, 3),
            wReset:  new Status(domVar.reset, 4),
            wLap:    new Status(domVar.lap, 5),
            tStart:  new Status(domVar.startTimer, 6),
            tPause:  new Status(domVar.pause, 7),
            tResume: new Status(domVar.resumeTimer, 8),
            tCancel: new Status(domVar.cancel, 9)
        };
    }

    buttonState() {
        let wCounter = 0;
        let tCounter = 0;

        for (let key in this.statuses) {
            const status = this.statuses[key];
            status.status = window.getComputedStyle(status.name).visibility;

            if(status.index > 5) {
                if(this.isFirstPass && status.index === 6){
                    status.status = "visible";
                } else if(status.status === "hidden")
                    tCounter += 1;
            }
            else
                if(status.status === "hidden")
                    wCounter += 1;
        }

        for (let key in this.statuses) {
            const status = this.statuses[key];

            status.status = window.getComputedStyle(status.name).visibility;

            if(wCounter != 5 && status.index <= 5){
                status.newStatus = status.status;
                status.save();
            }

            if(tCounter != 4 && status.index > 5) {
                status.newStatus = status.status;
                status.save();
            }

            if(this.index === 0) {
                if(status.index > 5)
                    this.toToggle.toggleVisibility(status.name, false);
                else 
                    if(status.newStatus === "visible" ) 
                        this.toToggle.toggleVisibility(status.name, true);
            }
            else {
                if(status.index <= 5)
                    this.toToggle.toggleVisibility(status.name, false);
                else 
                    if(status.newStatus === "visible") 
                        this.toToggle.toggleVisibility(status.name, true);
            }
        }
    }
}