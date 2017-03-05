interface Object
{
    CustomEventListeners: [string, Object, Function][];

    listenToEvent(eventName: string, callback: Function): void;
    unlistenFromEvent(eventName: string, callback: Function): void;
    fireEvent(eventName: string): void;
}

Object.prototype.CustomEventListeners = new Array<[string, Object, Function]>();

Object.prototype.listenToEvent = function listenToEvent(eventName: string, callback: Function): void
{
    this.CustomEventListeners.push([eventName, this, callback]);
}

Object.prototype.unlistenFromEvent = function unlistenFromEvent(eventName: string, callback: Function): void
{
    let index: number = this.CustomEventListeners.indexOf([eventName, this, callback]);

    this.CustomEventListeners.splice(index, 1);
}

Object.prototype.fireEvent = function fireEvent(eventName: string): void
{
    for (let i: number = 0; i < this.CustomEventListeners.length; i++)
    {
        if (this.CustomEventListeners[i][0] === eventName &&
            this.CustomEventListeners[i][1] == this)
        {
            this.CustomEventListeners[i][2](this);
        }
    }
}