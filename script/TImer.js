import { domVar } from './Variables.js';
import { doCancel, checkTimeType } from './Main.js';

export class Timer {
    constructor () {
        this.elementSet1 = this.setTime(0, 99);
        this.elementSet2 = this.setTime(0, 59);

        this.counter     = 0;
        this.origHour    =  0;
        this.origMinutes =  0;
        this.origSeconds =  0;

        this.hours   = 0;
        this.minutes = 0;
        this.seconds = 0;
        this.endTime = 0;
        this.timeeId = null;
    }

    setTime(start, end) {
        let elements = "";

        for (let i = start; i <= end; i++) 
            elements += `<li>${i.toString().padStart(2, '0')}</li>`;

        return elements;
    }

    fillUL() {
        domVar.timeUl.forEach((ul, index) => {
            const timeSet = index === 0 ? this.elementSet1 : this.elementSet2;
            ul.insertAdjacentHTML("beforeend", timeSet);

            ul.addEventListener('scroll', () => {
                const scrollBottom = ul.scrollHeight - ul.scrollTop === ul.clientHeight;
                const scrollTop = ul.scrollTop === 0;

                if (scrollBottom) {
                    ul.innerHTML += timeSet; 
                }

                if (scrollTop) {
                    ul.innerHTML = timeSet + ul.innerHTML; 
                    ul.scrollTop = ul.scrollHeight - ul.clientHeight; 
                }
            });
        });
    }

    doStartTimer() {
        this.hours   = parseInt(domVar.hours.textContent, 10);
        this.minutes = parseInt(domVar.minutes.textContent, 10);
        this.seconds = parseInt(domVar.seconds.textContent, 10);

        if(this.counter === 0) {
            this.origHour    = this.hours;
            this.origMinutes = this.minutes;
            this.origSeconds = this.seconds;

            this.counter++;
        }

       const start =  (this.hours   * 60 * 60 * 1000) 
                    + (this.minutes * 60 * 1000) 
                    + (this.seconds * 1000);
        
        this.endTime = new Date().getTime() + start;
        this.timeeId = setInterval(() => this.runTimer(), 1000);
    }

    doPauseTimer() {
        clearInterval(this.timeeId);
    }

    doResumeTimer() {
        this.doStartTimer();
    }

    runTimer() {
        const curTime = new Date().getTime();
        const distance = this.endTime - curTime;

        if (distance <= 0) {
            clearInterval(this.timeeId);
            alert("Time down!!");
        
            domVar.circle.style.borderColor = "hsl(115, 100%, 40%)";
            
            doCancel();
            checkTimeType();
            return;
        };

        if (distance <= 60000) {
            domVar.circle.style.borderColor = "hsl(17, 100%, 40%)";
        } 


        const newHour    = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
              newMinutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
              newSeconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        this.updateTime( newHour   .toString().padStart(2, '0'),
                         newMinutes.toString().padStart(2, '0'),
                         newSeconds.toString().padStart(2, '0'));
    }

    updateTime(hours, minutes, seconds) {
        domVar.hours.textContent   = hours;
        domVar.minutes.textContent = minutes;
        domVar.seconds.textContent = seconds;
    }

    cancelTimer() {
        if (this.timeeId !== null) {
            domVar.circle.style.borderColor = "hsl(115, 100%, 40%)";
            clearInterval(this.timeeId);
            this.timeeId = null;
            this.counter = 0;
            this.resetTimer();
        }
    }

    resetTimer() {
        this.updateTime( this.origHour   .toString().padStart(2, '0'),
                         this.origMinutes.toString().padStart(2, '0'),
                         this.origSeconds.toString().padStart(2, '0'))
    }
}
