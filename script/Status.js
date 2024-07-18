export class Status {
    constructor(name, index) {
        this.index  = index;
        this.name   = name;
        this.status = null;

        const storedStatus = JSON.parse(localStorage.getItem(`newStatus_${index}`)) || { newStatus: "hidden" };
        this.newStatus = storedStatus.newStatus;
    }

    save() {
        localStorage.setItem(`newStatus_${this.index}`, JSON.stringify({  newStatus: this.newStatus }));
    }
}