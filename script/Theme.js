import { colors, domVar } from './Variables.js';

export class Theme {
    constructor() {
        this.history   = new History;
        this.storedBG  = this.history.mode;

        this.root      = document.documentElement;
        this.isDefault = this.getDefault();

        this.setVisibility();
    }

    getDefault() {
        return this.storedBG === "rgba(0, 0, 0, 0.9)";
    }

    setStyles(properties) {
        Object.keys(properties).forEach(property => {
            this.root.style.setProperty(`--${property}`, properties[property]);
        });
    }

    setVisibility() {
        const isHidden = this.isDefault
        
        domVar.themeDark
              .style.visibility = isHidden ? "hidden" 
                                           : "visible";
        domVar.themeLight
              .style.visibility = isHidden ? "visible" 
                                           : "hidden";
    }

    update() {
        const changeColor = this.isDefault ? colors.default : colors.nonDefault;

        this.setStyles({
            'button-color': changeColor.buttonColor,
            'title-shad1' : changeColor.shad1,
            'title-shad2' : changeColor.shad2,
            'svg-shadow'  : changeColor.filter,
            'box-shadow'  : changeColor.shadow,
            'text-color'  : changeColor.textColor,
            'button-bg'   : changeColor.buttonBg,
            'bg-color'    : changeColor.bgColor,
            'svg-fill'    : changeColor.fill
        });
    }
}


export class History {
    constructor() {
        const storedMode = JSON.parse(localStorage.getItem("storedMode")) || { Mode: "rgb(246, 246, 246)" }

        this.mode   = storedMode.Mode
    }

    save() {
        localStorage.setItem("storedMode", JSON.stringify({ Mode : this.mode }));
    }
}