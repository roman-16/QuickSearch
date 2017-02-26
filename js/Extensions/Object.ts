interface Object
{
    CustomEventListeners: CustomEventListener[];

    listenToEvent(eventName: string, callback: Function): void;
    unlistenFromEvent(eventName: string, callback: Function): void;
    fireEvent(eventName: string): void;
}

Object.prototype.CustomEventListeners = new Array<CustomEventListener>();

Object.prototype.listenToEvent = function listenToEvent(eventName: string, callback: Function): void
{
    this.CustomEventListeners.push(new CustomEventListener(eventName, callback));
}

Object.prototype.unlistenFromEvent = function unlistenFromEvent(eventName: string, callback: Function): void
{
    let index: number = this.CustomEventListeners.indexOf(new CustomEventListener(eventName, callback));

    this.CustomEventListeners.splice(index, 1);
}

Object.prototype.fireEvent = function fireEvent(eventName: string): void
{
    for (let i: number = 0; i < this.CustomEventListeners.length; i++)
    {
        if (this.CustomEventListeners[i].EventName === eventName)
        {
            this.CustomEventListeners[i].Callback(this);
        }
    }
}

class CustomEventListener
{
    private eventName: string;
    private callback: Function;



    public constructor(eventName: string, callback: Function)
    {
        this.eventName = eventName;
        this.callback = callback;
    }



    public get EventName(): string
    {
        return this.eventName;
    }

    public get Callback(): Function
    {
        return this.callback;
    }
}