class Sidebar
{
    private parent: HTMLDivElement;
    private sidebarDiv: HTMLDivElement = document.createElement("div");
    private menuIcon: HTMLElement = document.createElement("i");
    private menuButton: HTMLButtonElement = document.createElement("button");
    private menubarDiv: HTMLDivElement = document.createElement("div");
    private inputChildren: Array<IInputForm> = new Array<IInputForm>();
    private isExpanded: boolean = false;
    private isFirstExpanded: boolean = false;
    private expandTime: number = 200;
    private expandSize: string = "40%";
    private backgroundColor: string = "#525252";
    private iconColor: string = "#3a5b83";
    private iconColorFocus: string = "#000000";
    private elementsBackgroundColor: string = "#757575";
    private elementsBackgroundColorFocus: string = "#3a5b83";
    private elementsFontColor: string = "#525252";

    

    public constructor(parent: HTMLDivElement)
    {
        this.parent = parent;

        this.sidebarDiv.className = "sidebarDiv";
        this.menuButton.className = "menuButton";
        this.menuButton.onclick = this.clicked.bind(this);
        this.menuIcon.className = "menuIcon fa fa-bars fa-lg";
        this.menuIcon.style.transition = "opacity " + this.expandTime + "ms";
        this.menubarDiv.className = "menubarDiv";
        this.menubarDiv.style.transition = "width " + this.expandTime + "ms";

        this.update();

        this.menuButton.appendChild(this.menuIcon);
        this.sidebarDiv.appendChild(this.menuButton);
        this.sidebarDiv.appendChild(this.menubarDiv);
        this.parent.appendChild(this.sidebarDiv);

        document.onClickOutside(this.menubarDiv, this.reduce.bind(this));
    }
    

    
    public addEventListener(name: string, callback: EventListener): void
    {
        window.addEventListener(name, callback);
    }

    public appendChild(child: HTMLElement): void
    {
        this.menubarDiv.appendChild(child);
    }

    public appendInput(input: IInputForm): void
    {
        this.inputChildren.push(input);

        this.menubarDiv.appendChild(input.getElement());
    }

    public appendButton(button: IButtonForm): void
    {
        this.menubarDiv.appendChild(button.getElement());
    }

    public appendLayout(layout: ILayout): void
    {
        this.menubarDiv.appendChild(layout.getElement());
    }

    public set BackgroundColor(value: string)
    {
        this.backgroundColor = value;

        this.updateBackground();
    }

    public set IconColor(value: string)
    {
        this.iconColor = value;

        this.updateIcon();
    }

    public set IconColorFocus(value: string)
    {
        this.iconColorFocus = value;

        this.updateIcon();
    }

    public set ElementsBackgroundColor(value: string)
    {
        this.elementsBackgroundColor = value;

        this.updateElements();
    }

    public set ElementsBackgroundColorFocus(value: string)
    {
        this.elementsBackgroundColorFocus = value;

        this.updateElements();
    }

    public set ElementsFontColor(value: string)
    {
        this.elementsFontColor = value;

        this.updateElements();
    }

    public get InputChildren(): Array<IInputForm>
    {
        return this.inputChildren;
    }



    private clicked(ev: MouseEvent): void
    {
        if (this.isExpanded)
        {
            this.reduce();
        }
        else
        {
            this.expand();

            this.menubarDiv.focus();
        }
    }

    private expand(): void
    {
        if (!this.isFirstExpanded)
        {
            //Fire event
            this.fireEvent("SidebarFirstExpand");

            this.isFirstExpanded = true;
        }

        this.menuIcon.style.opacity = "0.0";

        setTimeout(function ()
        {
            //Change icon
            this.updateIconExpanded();

            //Display menubar
            this.menubarDiv.style.width = this.expandSize;
            this.menubarDiv.style.padding = "0em 1.5em 0em 0em";

            setTimeout(function ()
            {
                this.isExpanded = true;
            }.bind(this), this.expandTime);
        }.bind(this), this.expandTime);
    }

    private reduce(): void
    {
        if (!this.isExpanded)
            return;
        
        this.menuIcon.style.opacity = "0.0";

        setTimeout(function ()
        {
            //Hide menubar
            this.menubarDiv.style.padding = "0em 0em 0em 0em";
            this.menubarDiv.style.width = "0%";

            //Change icon
            this.updateIconReduced();

            this.isExpanded = false;
        }.bind(this), this.expandTime);
    }

    private update(): void
    {
        this.updateBackground();
        this.updateIcon();
    }

    private updateBackground(): void
    {
        this.menubarDiv.style.backgroundColor = this.backgroundColor;
    }

    private updateIcon(): void
    {
        if (this.isExpanded)
        {
            this.updateIconExpanded();
        }
        else
        {
            this.updateIconReduced();
        }
    }

    private updateIconExpanded(): void
    {
        this.menuIcon.className = this.menuIcon.className.replace("fa-bars", "fa-times");
        this.menuIcon.style.opacity = "initial";
        this.menuIcon.style.color = this.iconColorFocus;
    }

    private updateIconReduced(): void
    {
        this.menuIcon.className = this.menuIcon.className.replace("fa-times", "fa-bars");
        this.menuIcon.style.opacity = "initial";
        this.menuIcon.style.color = this.iconColor;
    }

    private updateElements(): void
    {

    }
}