import { domVar } from './Variables.js';

export class Watch {
    constructor() {
        this.startTime    = 0;
        this.elapsedTime  = 0;
        this.elapsedTimes = [];

        this.laptimer     = null;
        this.lapTime      = 0;
        this.lapTimes     = [];
        this.startLapTime = 0;

        this.updateWatch    = this.updateWatch.bind(this);
        this.updateLapWatch = this.updateLapWatch.bind(this);
    }

    startWatch() {
        this.startTime = Date.now() - this.elapsedTime;
        this.timer     = setInterval(this.updateWatch, 10);
    }

    stopWatch() {
        clearInterval(this.timer);
        this.elapsedTime = Date.now() - this.startTime;

        clearInterval(this.lapTimer);
        this.lapTime = Date.now() - this.startLapTime;
    
        document.title = "Get Time Going!";
    }

    resumeWatch() {
        this.startWatch();
        
        if(this.lapTimes.length === 0)
            this.lapTime = 0;

        this.lapWatch(false)
    }

    lapWatch(isRead) {
        if(isRead) {
            clearInterval(this.lapTimer);
            this.storeTime();
            this.triggerLapTime();
            this.lapElemStatus(true);
            
        } else if(this.lapTimer != null) {
            this.startLapTime = Date.now() - this.lapTime;
            this.lapTimer  = setInterval(this.updateLapWatch, 10);
        }

    }

    resetWatch() {
        this.resetMainTime();
        this.resetLapTime();
        this.lapElemStatus(false);
        this.updateContainer('timeContainer', 'jsTimeContainer');

        document.title = "Get Time Going!";
        domVar.timeCounter.textContent = "00 : 00 : 00 : 00";
    }

    updateWatch() {
        const curTime    = Date.now();
        this.elapsedTime = curTime - this.startTime;
        let formatTime   = this.getTime(this.elapsedTime);
        
        domVar.timeCounter.textContent = formatTime;
        document.title = formatTime;
    }

    updateLapWatch() {
        const curTime = Date.now();
        this.lapTime  = curTime - this.startLapTime;
        
        let formatTime   = this.getTime(this.lapTime);
        
        domVar.timeCounterLap.textContent = formatTime;
    }

    getTime(time) {
        let hours      = Math.floor( time / (1000 * 60 * 60)) .toString().padStart(2,0);
        let minutes    = Math.floor((time / (1000 * 60)) % 60).toString().padStart(2,0);
        let seconds    = Math.floor((time / 1000) % 60)       .toString().padStart(2,0);
        let milSeconds = Math.floor((time % 1000) / 10)       .toString().padStart(2,0);

        return `${hours} : ${minutes} : ${seconds} : ${milSeconds}`;
    }

    getMaxLap() {
        if (this.lapTimes.length > 0) {
            let maxLapTime = this.lapTimes[0];
            let maxLapIndex = 0;

            for (let i = 1; i < this.lapTimes.length; i++) {
                if (this.lapTimes[i] > maxLapTime) {
                    maxLapTime = this.lapTimes[i];
                    maxLapIndex = i;
                }
            }

            return maxLapIndex;
        }
    }

    getMinLap() {
        if (this.lapTimes.length > 0) {
            let minLapTime = this.lapTimes[0];
            let minLapIndex = 0;

            for (let i = 1; i < this.lapTimes.length; i++) {
                if (this.lapTimes[i] < minLapTime) {
                    minLapTime = this.lapTimes[i];
                    minLapIndex = i;
                }
            }

            return minLapIndex;
        }
    }

    lapElemStatus(isHidden) {
        this.toggleVisibility(domVar.timeCounterLap, isHidden);
        this.toggleVisibility(domVar.jsLaps, isHidden);
        
        
        if(isHidden &&  this.lapTimes.length > 0) {
            this.updateContainer('jsTimeContainer', 'timeContainer');
            this.setElemTable();
        }
    }

    toggleVisibility(element, isHidden) {
        element.style.visibility = isHidden ? "visible"  : "hidden";
        element.style.position   = isHidden ? "relative" : "absolute";
    }

    updateContainer(addClass, removeClass) {
        domVar.jsTimeContainer.classList.remove(removeClass);
        domVar.jsTimeContainer.classList.add(addClass);
    }

    setElemTable() {
        const maxLapIndex = this.getMaxLap();
        const minLapIndex = this.getMinLap();

        let row = "";
        const lapArrLength = this.lapTimes.length;

        for(let i = lapArrLength - 1; i >= 0; i--) {
            const lap      = (i+1).toString().padStart(2, '0');
            const timeLap  = this.lapTimes[i];
            const timeBase = this.elapsedTimes[i];

            let backgroundColor = '';

            if (minLapIndex === i)
                backgroundColor = 'rgba(63, 160, 102, 0.5)';
            else if (maxLapIndex === i) 
                backgroundColor = 'rgba(181, 210, 93, 0.5)';
            

            row += `<tr style="background-color: ${backgroundColor};">
                        <td>${lap}</td>
                        <td>${timeLap}</td>
                        <td class="col3">${timeBase}</td>
                    </tr>`;
            }

        domVar.lapData.innerHTML = "";
        domVar.lapData.insertAdjacentHTML("beforeend", row);
    }

    resetMainTime() {
        clearInterval(this.timer);
        this.startTime = 0;
        this.elapsedTime = 0;
        this.lapTimes = [];
    }

    resetLapTime() {
        clearInterval(this.lapTimer);
        this.elapsedTimes = [];
        this.startLapTime = 0;
        this.laptimer = null;
        this.lapTimes = [];
        this.lapTime = 0;
    }

    storeTime() {
        const overallTime = this.getTime(this.elapsedTime);
        const lapTime = this.lapTime === 0 
                                      ?  overallTime
                                      :  this.getTime(this.lapTime);

        this.lapTimes.push(lapTime);
        this.elapsedTimes.push(overallTime);
    }

    triggerLapTime() {
        this.startLapTime = Date.now();        
        this.lapTime = 0;
        this.lapTimer  = setInterval(this.updateLapWatch, 10);
    }
}