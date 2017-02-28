class Search extends Homepage
{
    private parent: HTMLDivElement;
    private searchDiv: HTMLDivElement = document.createElement("div");
    private searchInputDiv: HTMLDivElement = document.createElement("div");
    private searchInput: HTMLInputElement = document.createElement("input");
    private searchSuggestionsDiv: HTMLDivElement = document.createElement("div");
    private searchSuggestions: SearchSuggestions;
    private useSearchSuggestions: boolean = true;
    private backgroundColor: string = "#363636";
    private backgroundColorFocus: string = "#525252";
    private borderColor: string = "#363636";
    private borderColorFocus: string = "#525252";
    private fontColor: string = "#3a5b83";
    private fontColorFocus: string = "#000000";



    public constructor(parent: HTMLDivElement, homepage: string, quickSearchHotkeyStart: string = "", quickSearch: string[][] = [["", ""]], quickSearchHotkeyEnd: string = "")
    {
        super(homepage, quickSearchHotkeyStart, quickSearch, quickSearchHotkeyEnd);

        this.parent = parent;

        this.searchSuggestions = new SearchSuggestions(this.searchSuggestionsDiv);

        this.SearchSuggestions.listenToEvent("SearchSuggestionsClicked", this.searchSuggestionClicked.bind(this));

        this.searchDiv.className = "searchDiv";
        this.searchInputDiv.className = "searchInputDiv";
        this.searchInput.className = "searchInput";
        this.searchInput.type = "text";
        this.searchInput.autocomplete = "off";
        this.searchInput.autofocus = true;
        this.searchInput.onkeyup = this.keyPressed.bind(this);
        this.searchInput.onfocus = this.focused.bind(this);
        this.searchInput.onblur = this.blured.bind(this);
        this.searchSuggestionsDiv.className = "searchSuggestionsParentDiv";

        this.searchDiv.appendChild(this.searchInputDiv);
        this.searchInputDiv.appendChild(this.searchInput);
        this.searchDiv.appendChild(this.searchSuggestionsDiv);
        this.parent.appendChild(this.searchDiv);
    }



    public focus(): void
    {
        this.searchInput.focus();
    }

    public get SearchSuggestions(): SearchSuggestions
    {
        return this.searchSuggestions;
    }

    public set UseSearchSuggestions(value: boolean)
    {
        this.useSearchSuggestions = value;
    }

    public set BackgroundColor(value: string)
    {
        this.backgroundColor = value;
    }

    public set BackgroundColorFocus(value: string)
    {
        this.backgroundColorFocus = value;
    }

    public set BorderColor(value: string)
    {
        this.borderColor = value;
    }

    public set BorderColorFocus(value: string)
    {
        this.borderColorFocus = value;
    }

    public set FontColor(value: string)
    {
        this.fontColor = value;
    }

    public set FontColorFocus(value: string)
    {
        this.fontColorFocus = value;
    }



    private keyPressed(ev: KeyboardEvent): void
    {
        let value: string = this.searchInput.value;

        if (ev.keyCode == 13)
        {
            this.openHomepage(value.trim());
        }
        else if (ev.keyCode == 34 || ev.keyCode == 40)
        {
            //Select lower search suggestion
            value = this.keepQuickSearchHotkey(value) + this.searchSuggestions.selectDownwards();
        }
        else if (ev.keyCode == 33 || ev.keyCode == 38)
        {
            //Select upper search suggestion
            value = this.keepQuickSearchHotkey(value) + this.searchSuggestions.selectUpwards();
        }
        else if (ev.keyCode == 27)
        {
            //Hide search suggestion on escape
            this.searchSuggestions.hideSearchSuggestions();
        }
        else if (this.useSearchSuggestions)
        {
            this.searchSuggestions.showSearchSuggestions(this.removeQuickSearchHotkey(value));
        }

        //TODO: Key up, set cursor to last position (rework feature like google)
        this.searchInput.focus();
        this.searchInput.value = value;
    }

    private focused(ev: FocusEvent): void
    {
        this.searchInput.style.backgroundColor = this.backgroundColorFocus;
        this.searchInput.style.borderColor = this.borderColorFocus;
        this.searchInput.style.color = this.fontColorFocus;
    }

    private blured(ev: FocusEvent): void
    {
        this.searchInput.style.backgroundColor = this.backgroundColor;
        this.searchInput.style.borderColor = this.borderColor;
        this.searchInput.style.color = this.fontColor;
    }

    private searchSuggestionClicked(target: Object): void
    {
        this.searchInput.value = this.keepQuickSearchHotkey(this.searchInput.value) + (<HTMLInputElement>target).value;
        this.searchInput.focus();

        this.searchSuggestions.showSearchSuggestions(this.removeQuickSearchHotkey(this.searchInput.value));
    }

    private removeQuickSearchHotkey(value: string): string
    {
        if (!this.useQuickSearch)
        {
            return value;
        }

        let quickSearchHotkeys: string[] = this.quickSearch.getColumn(0);

        for (let i: number = 0; i < quickSearchHotkeys.length; i++)
        {
            quickSearchHotkeys[i] = this.quickSearchHotkeyStart + quickSearchHotkeys[i] + this.quickSearchHotkeyEnd;
        }

        for (let i: number = 0; i < quickSearchHotkeys.length; i++)
        {
            if (value.startsWith(quickSearchHotkeys[i]))
            {
                return value.replace(quickSearchHotkeys[i], "");
            }
        }

        return value;
    }

    private keepQuickSearchHotkey(value: string): string
    {
        if (!this.useQuickSearch)
        {
            return value;
        }

        let quickSearchHotkeys: string[] = this.quickSearch.getColumn(0);

        for (let i: number = 0; i < quickSearchHotkeys.length; i++)
        {
            quickSearchHotkeys[i] = this.quickSearchHotkeyStart + quickSearchHotkeys[i] + this.quickSearchHotkeyEnd;
        }

        for (let i: number = 0; i < quickSearchHotkeys.length; i++)
        {
            if (value.startsWith(quickSearchHotkeys[i]))
            {
                return quickSearchHotkeys[i];
            }
        }

        return "";
    }
}