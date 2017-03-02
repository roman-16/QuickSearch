class Menubar
{
    private parent: HTMLDivElement;
    private sidebar: Sidebar;
    private saveButton: Button;
    private resetButton: Button;
    private buttonLayout: ParallelLayout;
    private configChildren: Array<ConfigValue<any>> = new Array<ConfigValue<any>>();



    public constructor(parent: HTMLDivElement)
    {
        this.parent = parent;
        this.sidebar = new Sidebar(this.parent);

        this.sidebar.listenToEvent("SidebarFirstExpand", this.addElements.bind(this));
    }


    
    public get Sidebar(): Sidebar
    {
        return this.sidebar;
    }
    
    
    
    private addElements(): void
    {
        this.sidebar.appendChild(this.createSettingIcon());

        this.appendConfig("Homepage", Config.Homepage);
        this.appendConfig("Link start with", Config.LinkStartsWith);
        this.appendConfig("Quicksearch hotkey starts with", Config.QuickSearchHotkeyStart);
        this.appendConfig("Quicksearch", Config.QuickSearch);
        this.appendConfig("Quicksearch Hotkey Ends with", Config.QuickSearchHotkeyEnd);
        this.appendConfig("Use search suggestions", Config.UseSearchSuggestions);
        this.appendConfig("Number of search suggestions", Config.NumberOfSearchSuggestions);
        this.appendConfig("Clock separator", Config.ClockSeparator);
        this.appendConfig("Color", Config.ShapeColor);

        this.saveButton = new Button("Save");
        this.saveButton.BackgroundColorHover = Config.ShapeColor.Value;
        this.saveButton.Margin = "0px 20px 0px 0px";
        this.saveButton.listenToEvent("ButtonClicked", this.saveClicked.bind(this));
        this.resetButton = new Button("Reset");
        this.resetButton.BackgroundColorHover = Config.ShapeColor.Value;
        this.resetButton.listenToEvent("ButtonClicked", this.resetClicked.bind(this));
        this.buttonLayout = new ParallelLayout(this.saveButton.getElement());
        this.buttonLayout.appendChild(this.resetButton.getElement());

        this.sidebar.appendLayout(this.buttonLayout);
    }

    private createSettingIcon(): HTMLDivElement
    {
        let settingDiv: HTMLDivElement = document.createElement("div");
        let settingIcon: HTMLElement = document.createElement("i");
        let settingP: HTMLParagraphElement = document.createElement("p");

        settingDiv.className = "settingDiv";
        settingDiv.style.width = "100%";
        settingIcon.className = "menuIcon fa fa-cog";
        settingIcon.style.fontSize = "200%";
        settingIcon.style.color = "#000000";
        settingP.className = "settingP";
        settingP.innerText = "Settings";
        settingP.style.fontSize = "200%";
        settingP.style.marginLeft = "10px";

        settingDiv.appendChild(settingIcon);
        settingDiv.appendChild(settingP);

        return settingDiv;
    }

    private appendConfig(name: string, config: ConfigValue<any>): void
    {
        let value: string = config.StringifiedValue;
        let input: IInputForm;

        if (value.length > 40)
        {
            input = new BigTextInput(name, value);

            input.Style.height = "8rem";
            input.Style.width = "70%";
            input.Style.maxWidth = "85%";
        }
        else
        {
            input = new TextInput(name, value);
        }

        this.sidebar.appendInput(input);
        this.configChildren.push(config);
    }

    private saveClicked(target: Object): void
    {
        let inputChildren: Array<IInputForm> = this.sidebar.InputChildren;

        for (let i: number = 0; i < inputChildren.length; i++)
        {
            try
            {
                this.configChildren[i].Value = JSON.parse(inputChildren[i].Value);
            }
            catch (e)
            {
                inputChildren[i].Style.transition = "box-shadow 0s";
                inputChildren[i].Style.boxShadow = "0px 0px 8px #ff0000";
                //Focus must be here else this won't work
                inputChildren[i].focus();
                inputChildren[i].Style.transition = "box-shadow 5s";
                inputChildren[i].Style.boxShadow = "0px 0px 0px #000000";
                
                return;
            }

            this.configChildren[i].saveStringifiedValue(inputChildren[i].Value);
        }

        InformationBox.showText("Saved!", 2000);

        setTimeout(function()
        {
            location.reload();
        }.bind(this), 2500);
    }

    private resetClicked(target: Object): void
    {
        Config.reset();

        InformationBox.showText("Reseted!", 2000);

        setTimeout(function()
        {
            location.reload();
        }.bind(this), 2500);
    }
}