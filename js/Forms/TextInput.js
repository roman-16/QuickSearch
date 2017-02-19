var TextInput = (function () {
    function TextInput(name, defaultValue) {
        if (defaultValue === void 0) { defaultValue = ""; }
        this.textInputDiv = document.createElement("div");
        this.textInputP = document.createElement("p");
        this.textInput = document.createElement("input");
        this.backgroundColor = "#FFFFFF";
        this.fontColor = "#000000";
        this.textInputDiv.className = "textInputDiv";
        this.textInputDiv.style.width = "100%";
        this.textInputP.className = "textInputP";
        this.textInputP.innerText = name;
        this.textInputP.style.margin = "0px 10px 0px 0px";
        this.textInput.className = "textInput";
        this.textInput.value = defaultValue;
        this.textInput.type = "text";
        this.textInput.style.width = "40%";
        this.textInputDiv.appendChild(this.textInputP);
        this.textInputDiv.appendChild(this.textInput);
    }
    TextInput.prototype.getElement = function () {
        return this.textInputDiv;
    };
    TextInput.prototype.focus = function () {
        this.textInput.focus();
    };
    Object.defineProperty(TextInput.prototype, "Value", {
        get: function () {
            return this.textInput.value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextInput.prototype, "BackgroundColor", {
        set: function (value) {
            this.backgroundColor = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextInput.prototype, "FontColor", {
        set: function (value) {
            this.fontColor = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextInput.prototype, "Style", {
        get: function () {
            return this.textInput.style;
        },
        enumerable: true,
        configurable: true
    });
    return TextInput;
}());
