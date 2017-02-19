var CookieHandler = (function () {
    function CookieHandler() {
    }
    CookieHandler.saveItem = function (name, value) {
        var stringValue = JSON.stringify(value);
        localStorage.setItem(name, stringValue);
    };
    CookieHandler.getItem = function (name) {
        var stringValue = localStorage.getItem(name);
        return JSON.parse(stringValue);
    };
    return CookieHandler;
}());
