class ParallelLayout implements ILayout
{
    private layout: HTMLDivElement = document.createElement("div");



    public constructor(childDiv: HTMLDivElement)
    {
        this.layout.appendChild(childDiv);
    }



    public appendChild(childDiv: HTMLDivElement): void
    {
        this.layout.appendChild(childDiv);
    }

    public getElement(): HTMLDivElement
    {
        return this.layout;
    }
}