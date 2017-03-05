class InformationBox
{
    private static isInit: boolean = false;
    private static informationDiv: HTMLDivElement = document.createElement("div");
    private static innerInformationDiv: HTMLDivElement = document.createElement("div");
    private static informationText: HTMLParagraphElement = document.createElement("p");



    private static init(): void
    {
        if (!InformationBox.isInit)
        {
            InformationBox.informationDiv.className = "infoDiv";
            InformationBox.informationDiv.style.display = "none";

            InformationBox.innerInformationDiv.className = "innerInfoDiv";

            InformationBox.informationText.className = "infoText";

            InformationBox.innerInformationDiv.appendChild(InformationBox.informationText);
            InformationBox.informationDiv.appendChild(InformationBox.innerInformationDiv);
            document.body.appendChild(InformationBox.informationDiv);

            InformationBox.isInit = true;
        }
    }



    public static showText(text: string, timeout: number = 2000): void
    {
        this.init();
        this.informationText.innerText = text;

        this.informationDiv.style.display = "inline";

        setTimeout(function()
        {
            this.informationDiv.style.display = "none";

            this.fireEvent("OnTextClose");
        }.bind(this), timeout);
    }
}