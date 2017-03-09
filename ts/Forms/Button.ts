class Button implements IButtonForm
{
    public onClick: QuickEvent = new QuickEvent();

    private value: string;
    private buttonDiv: HTMLDivElement = document.createElement("div");
    private button: HTMLButtonElement = document.createElement("button");
    private isHovered: boolean = false;
    private backgroundColor: string = "#FFFFFF";
    private backgroundColorHover: string = "#000000";
    private fontColor: string = "#000000";
    private fontColorHover: string = "#FFFFFF";



    public constructor(value: string)
    {
        this.value = value;

        this.buttonDiv.className = "buttonDiv";
        this.buttonDiv.style.width = "100%";
        this.button.className = "button";
        this.button.innerText = value;
        this.button.onclick = this.mouseClicked.bind(this);
        this.button.onmouseover = this.hovered.bind(this);
        this.button.onmouseout = this.blured.bind(this);
        this.button.style.border = "0px";
        this.button.style.padding = "10px 10px 10px 10px";
        this.button.style.backgroundColor = this.backgroundColor;

        this.buttonDiv.appendChild(this.button);
    }



    public getElement(): HTMLDivElement
    {
        return this.buttonDiv;
    }



    private mouseClicked(ev: MouseEvent): void
    {
        this.onClick.fire(this);
    }

    private hovered(): void
    {
        this.isHovered = true;

        this.updateButton();
    }

    private blured(): void
    {
        this.isHovered = false;

        this.updateButton();
    }

    private updateButton(): void
    {
        if (this.isHovered)
        {
            this.button.style.backgroundColor = this.backgroundColorHover;
            this.button.style.color = this.fontColorHover;
        }
        else
        {
            this.button.style.backgroundColor = this.backgroundColor;
            this.button.style.color = this.fontColor;
        }
    }



    public set BackgroundColor(value: string)
    {
        this.backgroundColor = value;

        this.updateButton();
    }

    public set BackgroundColorHover(value: string)
    {
        this.backgroundColorHover = value;

        this.updateButton();
    }

    public set FontColor(value: string)
    {
        this.fontColor = value;

        this.updateButton();
    }

    public set FontColorHover(value: string)
    {
        this.fontColorHover = value;

        this.updateButton();
    }

    public set Margin(value: string)
    {
        this.buttonDiv.style.margin = value;
    }

    public get Style(): CSSStyleDeclaration
    {
        return this.button.style;
    }
}