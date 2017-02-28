interface Object
{
    CustomEventListeners: [string, Function][];

    listenToEvent(eventName: string, callback: Function): void;
    unlistenFromEvent(eventName: string, callback: Function): void;
    fireEvent(eventName: string): void;
}

Object.prototype.CustomEventListeners = new Array<[string, Function]>();

Object.prototype.listenToEvent = function listenToEvent(eventName: string, callback: Function): void
{
    this.CustomEventListeners.push([eventName, callback]);
}

Object.prototype.unlistenFromEvent = function unlistenFromEvent(eventName: string, callback: Function): void
{
    let index: number = this.CustomEventListeners.indexOf([eventName, callback]);

    this.CustomEventListeners.splice(index, 1);
}

Object.prototype.fireEvent = function fireEvent(eventName: string): void
{
    for (let i: number = 0; i < this.CustomEventListeners.length; i++)
    {
        if (this.CustomEventListeners[i][0] === eventName)
        {
            this.CustomEventListeners[i][1](this);
        }
    }
}