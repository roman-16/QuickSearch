var Clock = (function () {
    function Clock(parent) {
        this.clockDiv = document.createElement("div");
        this.clock = document.createElement("time");
        this.separator = ":";
        this.clockDiv.className = "clockDiv";
        this.clock.className = "clock";
        parent.appendChild(this.clockDiv);
        this.clockDiv.appendChild(this.clock);
        this.initInterval();
    }
    Clock.prototype.initInterval = function () {
        this.updateTime();
        setInterval(this.updateTime.bind(this), 10000);
    };
    Clock.prototype.updateTime = function () {
        var date = new Date();
        var hours = this.format(date.getHours());
        var minutes = this.format(date.getMinutes());
        this.clock.innerHTML = hours + this.separator + minutes;
    };
    Clock.prototype.format = function (num) {
        return ("0" + num.toString()).slice(-2);
    };
    Object.defineProperty(Clock.prototype, "Seperator", {
        set: function (value) {
            this.separator = value;
            this.updateTime();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Clock.prototype, "Color", {
        set: function (value) {
            this.clock.style.color = value;
            this.updateTime();
        },
        enumerable: true,
        configurable: true
    });
    return Clock;
}());
