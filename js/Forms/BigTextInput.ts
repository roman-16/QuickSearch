class BigTextInput implements IInputForm
{
    private bigTextInputDiv: HTMLDivElement = document.createElement("div");
    private bigTextInputP: HTMLParagraphElement = document.createElement("p");
    private bigTextInput: HTMLTextAreaElement = document.createElement("textarea");
    private backgroundColor: string = "#FFFFFF";
    private fontColor: string = "#000000";



    public constructor(name: string, defaultValue: string = "")
    {
        this.bigTextInputDiv.className = "bigTextInputDiv";
        this.bigTextInputDiv.style.width = "100%";
        this.bigTextInputP.className = "textInputP";
        this.bigTextInputP.innerText = name;
        this.bigTextInputP.style.margin = "0px 10px 0px 0px";
        this.bigTextInput.className = "bigTextInput";
        this.bigTextInput.value = defaultValue;

        this.bigTextInputDiv.appendChild(this.bigTextInputP);
        this.bigTextInputDiv.appendChild(this.bigTextInput);
    }

    

    public getElement(): HTMLDivElement
    {
        return this.bigTextInputDiv;
    }

    public focus(): void
    {
        this.bigTextInput.focus();
    }

    public get Value()
    {
        return this.bigTextInput.value;
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
        return this.bigTextInput.style;
    }
}