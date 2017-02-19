var ConfigValue = (function () {
    function ConfigValue(name, value) {
        this.name = name;
        if (this.isSavedValue())
            this.Value = this.loadValue();
        else
            this.Value = value;
    }
    ConfigValue.prototype.loadValue = function () {
        var stringifiedValue = localStorage.getItem(this.name);
        this.value = JSON.parse(stringifiedValue);
        return this.value;
    };
    ConfigValue.prototype.saveValue = function (value) {
        var stringifiedValue = JSON.stringify(value);
        localStorage.setItem(this.name, stringifiedValue);
    };
    ConfigValue.prototype.saveStringifiedValue = function (stringifiedValue) {
        localStorage.setItem(this.name, stringifiedValue);
    };
    ConfigValue.prototype.isSavedValue = function () {
        var test = localStorage.getItem(this.name);
        return localStorage.getItem(this.name) !== null;
    };
    Object.defineProperty(ConfigValue.prototype, "Name", {
        get: function () {
            return this.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigValue.prototype, "Value", {
        get: function () {
            return this.value;
        },
        set: function (value) {
            this.value = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigValue.prototype, "StringifiedValue", {
        get: function () {
            return JSON.stringify(this.value);
        },
        enumerable: true,
        configurable: true
    });
    return ConfigValue;
}());
