import { domVar } from './Variables.js';

export class TimePicker {
    constructor(parent, scroller, timeType) {
        this.scrollTimeout = null; 
        this.parentElement = parent;
        this.element = scroller;
        this.timeType = timeType;

        this.setNearestItem = this.setNearestItem.bind(this); 
    }

    getNearestItem() {
        const parentCoordinates = this.parentElement.getBoundingClientRect();
        const items = this.element.querySelectorAll('li');

        let nearestItem = null;
        let minDistance = Infinity;

        items.forEach(item => {
            const itemCoordinate = item.getBoundingClientRect();

            const itemCenter = (itemCoordinate.top + itemCoordinate.bottom) / 2;
            const parentCenter = (parentCoordinates.top + parentCoordinates.bottom) / 2;

            const distance = Math.abs(itemCenter - parentCenter);

            if (distance < minDistance) {
                minDistance = distance;
                nearestItem = item;
            }
        });

        this.timeType.textContent = nearestItem.textContent;
        return nearestItem;
    }

    setNearestItem() {
        clearTimeout(this.scrollTimeout);

        this.scrollTimeout = setTimeout(() => {
            const nearestItem = this.getNearestItem();

            if (nearestItem) {
                nearestItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 250);
    }
}
