Object.prototype.listenToEvent = function listenToEvent(eventName, callback) {
    this.addEventListener(eventName, callback, false);
};
Object.prototype.unlistenFromEvent = function unlistenFromEvent(eventName, callback) {
    this.removeEventListener(eventName, callback, false);
};
Object.prototype.fireEvent = function fireEvent(eventName) {
    var event;
    if (document.createEvent) {
        //Workaround for internet explorer
        event = document.createEvent("CustomEvent");
        event.initEvent(eventName, true, true);
    }
    else {
        event = new CustomEvent(eventName);
    }
    this.dispatchEvent(event);
};
