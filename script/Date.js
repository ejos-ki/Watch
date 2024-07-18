import { domVar } from './Variables.js'

const today = new Date();

const month = convertMonth(today.getMonth());
const day   = convertDay(today.getDay());
const date  = today.getDate();

domVar.dateWeek.textContent = `${day}, ${month} ${date}`;

domVar.clock.textContent = setTime(today);

setInterval(() => {
    const today = new Date();
    domVar.clock.textContent = setTime(today);
}, 1000)


function convertMonth(month) {
    switch(month) {
        case 0: return "January";
        case 1: return "Febuary";
        case 2: return "March";
        case 3: return "April";
        case 4: return "May";
        case 5: return "June";
        case 6: return "July";
        case 7: return "August";
        case 8: return "September";
        case 9: return "October";
       case 10: return "November";
       default: return "December";
    }
}

function convertDay(day) {
    switch(day) {
        case 0: return "Sunday";
        case 1: return "Monday";
        case 2: return "Tuesday";
        case 3: return "Wednesday";
        case 4: return "Thursday";
        case 5: return "Friday";
       default: return "Saturday";
    }
}

function setTime(today) {
    const hour = today.getHours();
    const minutes = today.getMinutes();

    let meridiem = hour >= 12 ? "PM" : "AM";

    let newTime = hour > 12 ? hour - 12 : hour;

    if(hour === 0)
        newTime = 12;

    newTime = newTime.toString().padStart(2,'0');
    let newMinute = minutes.toString().padStart(2,'0');
    return `${newTime}:${newMinute} ${meridiem}`
}