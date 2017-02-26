Object.prototype.CustomEventListeners = new Array();
Object.prototype.listenToEvent = function listenToEvent(eventName, callback) {
    this.CustomEventListeners.push(new CustomEventListener(eventName, callback));
};
Object.prototype.unlistenFromEvent = function unlistenFromEvent(eventName, callback) {
    var index = this.CustomEventListeners.indexOf(new CustomEventListener(eventName, callback));
    this.CustomEventListeners.splice(index, 1);
};
Object.prototype.fireEvent = function fireEvent(eventName) {
    for (var i = 0; i < this.CustomEventListeners.length; i++) {
        if (this.CustomEventListeners[i].EventName === eventName) {
            this.CustomEventListeners[i].Callback(this);
        }
    }
};
var CustomEventListener = (function () {
    function CustomEventListener(eventName, callback) {
        this.eventName = eventName;
        this.callback = callback;
    }
    Object.defineProperty(CustomEventListener.prototype, "EventName", {
        get: function () {
            return this.eventName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CustomEventListener.prototype, "Callback", {
        get: function () {
            return this.callback;
        },
        enumerable: true,
        configurable: true
    });
    return CustomEventListener;
}());
