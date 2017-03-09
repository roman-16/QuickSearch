class QuickEvent
{
    private eventListeners: Function[] = new Array<Function>();



    public listen(callback: Function): void
    {
        this.eventListeners.push(callback);
    }

    public unlisten(callback: Function): void
    {
        let index: number = this.eventListeners.indexOf(callback);

        this.eventListeners.splice(index, 1);
    }

    public isListen(callback: Function): boolean
    {
        let index: number = this.eventListeners.indexOf(callback);

        return index !== -1;
    }

    public fire(eventArgs: Object = {}): void
    {
        for (let i: number = 0; i < this.eventListeners.length; i++)
        {
            this.eventListeners[i](eventArgs);
        }
    }
}