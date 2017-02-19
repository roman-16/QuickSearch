class TextInput implements IInputForm
{
    private textInputDiv: HTMLDivElement = document.createElement("div");
    private textInputP: HTMLParagraphElement = document.createElement("p");
    private textInput: HTMLInputElement = document.createElement("input");
    private backgroundColor: string = "#FFFFFF";
    private fontColor: string = "#000000";



    public constructor(name: string, defaultValue: string = "")
    {
        this.textInputDiv.className = "textInputDiv";
        this.textInputDiv.style.width = "100%";
        this.textInputP.className = "textInputP";
        this.textInputP.innerText = name;
        this.textInputP.style.margin = "0px 10px 0px 0px";
        this.textInput.className = "textInput";
        this.textInput.value = defaultValue;
        this.textInput.type = "text";
        this.textInput.style.width = "40%";

        this.textInputDiv.appendChild(this.textInputP);
        this.textInputDiv.appendChild(this.textInput);
    }

    

    public getElement(): HTMLDivElement
    {
        return this.textInputDiv;
    }

    public focus(): void
    {
        this.textInput.focus();
    }

    public get Value()
    {
        return this.textInput.value;
    }

    public set BackgroundColor(value: string)
    {
        this.backgroundColor = value;
    }

    public set FontColor(value: string)
    {
        this.fontColor = value;
    }

    public get Style(): CSSStyleDeclaration
    {
        return this.textInput.style;
    }
}