interface Object
{
    listenToEvent(eventName: string, callback: Function): void;
    unlistenFromEvent(eventName: string, callback: Function): void;
    fireEvent(eventName: string): void;
}

Object.prototype.listenToEvent = function listenToEvent(eventName: string, callback: Function): void
{
    this.addEventListener(eventName, callback, false);
}

Object.prototype.unlistenFromEvent = function unlistenFromEvent(eventName: string, callback: Function): void
{
    this.removeEventListener(eventName, callback, false);
}

Object.prototype.fireEvent = function fireEvent(eventName: string): void
{
    let event: CustomEvent;
    
    if (document.createEvent)
    {
        //Workaround for internet explorer
        event = document.createEvent("CustomEvent");

        event.initEvent(eventName, true, true);
    }
    else
    {
        event = new CustomEvent(eventName);
    }

    this.dispatchEvent(event);
}