var BigTextInput = (function () {
    function BigTextInput(name, defaultValue) {
        if (defaultValue === void 0) { defaultValue = ""; }
        this.bigTextInputDiv = document.createElement("div");
        this.bigTextInputP = document.createElement("p");
        this.bigTextInput = document.createElement("textarea");
        this.backgroundColor = "#FFFFFF";
        this.fontColor = "#000000";
        this.bigTextInputDiv.className = "bigTextInputDiv";
        this.bigTextInputDiv.style.width = "100%";
        this.bigTextInputP.className = "textInputP";
        this.bigTextInputP.innerText = name;
        this.bigTextInputP.style.margin = "0px 10px 0px 0px";
        this.bigTextInput.className = "bigTextInput";
        this.bigTextInput.value = defaultValue;
        this.bigTextInputDiv.appendChild(this.bigTextInputP);
        this.bigTextInputDiv.appendChild(this.bigTextInput);
    }
    BigTextInput.prototype.getElement = function () {
        return this.bigTextInputDiv;
    };
    BigTextInput.prototype.focus = function () {
        this.bigTextInput.focus();
    };
    Object.defineProperty(BigTextInput.prototype, "Value", {
        get: function () {
            return this.bigTextInput.value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BigTextInput.prototype, "BackgroundColor", {
        set: function (value) {
            this.backgroundColor = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BigTextInput.prototype, "FontColor", {
        set: function (value) {
            this.fontColor = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BigTextInput.prototype, "Style", {
        get: function () {
            return this.bigTextInput.style;
        },
        enumerable: true,
        configurable: true
    });
    return BigTextInput;
}());
