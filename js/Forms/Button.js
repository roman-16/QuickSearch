var Button = (function () {
    function Button(value) {
        this.buttonDiv = document.createElement("div");
        this.button = document.createElement("button");
        this.isHovered = false;
        this.backgroundColor = "#FFFFFF";
        this.backgroundColorHover = "#000000";
        this.fontColor = "#000000";
        this.fontColorHover = "#FFFFFF";
        this.value = value;
        this.buttonDiv.className = "buttonDiv";
        this.buttonDiv.style.width = "100%";
        this.button.className = "button";
        this.button.innerText = value;
        this.button.onclick = this.mouseClicked.bind(this);
        this.button.onmouseover = this.hovered.bind(this);
        this.button.onmouseout = this.blured.bind(this);
        this.button.style.border = "0px";
        this.button.style.padding = "10px 10px 10px 10px";
        this.button.style.backgroundColor = this.backgroundColor;
        this.buttonDiv.appendChild(this.button);
    }
    Button.prototype.addEventListener = function (name, callback) {
        this.buttonDiv.addEventListener(name, callback);
    };
    Button.prototype.getElement = function () {
        return this.buttonDiv;
    };
    Button.prototype.mouseClicked = function (ev) {
        var event = new MouseEvent("ButtonClicked", ev);
        this.buttonDiv.dispatchEvent(event);
    };
    Button.prototype.hovered = function () {
        this.isHovered = true;
        this.updateButton();
    };
    Button.prototype.blured = function () {
        this.isHovered = false;
        this.updateButton();
    };
    Button.prototype.updateButton = function () {
        if (this.isHovered) {
            this.button.style.backgroundColor = this.backgroundColorHover;
            this.button.style.color = this.fontColorHover;
        }
        else {
            this.button.style.backgroundColor = this.backgroundColor;
            this.button.style.color = this.fontColor;
        }
    };
    Object.defineProperty(Button.prototype, "BackgroundColor", {
        set: function (value) {
            this.backgroundColor = value;
            this.updateButton();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Button.prototype, "BackgroundColorHover", {
        set: function (value) {
            this.backgroundColorHover = value;
            this.updateButton();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Button.prototype, "FontColor", {
        set: function (value) {
            this.fontColor = value;
            this.updateButton();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Button.prototype, "FontColorHover", {
        set: function (value) {
            this.fontColorHover = value;
            this.updateButton();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Button.prototype, "Margin", {
        set: function (value) {
            this.buttonDiv.style.margin = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Button.prototype, "Style", {
        get: function () {
            return this.button.style;
        },
        enumerable: true,
        configurable: true
    });
    return Button;
}());
