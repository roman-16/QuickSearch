class SearchSuggestions
{
    private parent: HTMLDivElement;
    private searchSuggestionsDiv: HTMLDivElement = document.createElement("div");
    private selectedButton: number | null = null;
    private currentSearchSuggestionsData: any;
    private inputValue: string;
    private backgroundColor: string = "#757575";
    private backgroundColorFocus: string = "#3a5b83";
    private fontColor: string = "#000000";
    private fontColorFocus: string = "#FFFFFF";



    public constructor(parent: HTMLDivElement)
    {
        this.parent = parent;
        this.searchSuggestionsDiv.className = "searchSuggestionsDiv";
        this.searchSuggestionsDiv.onmouseout = this.resetSelectedButton.bind(this);

        this.parent.appendChild(this.searchSuggestionsDiv);

        document.onClickOutside(this.searchSuggestionsDiv, this.hideSearchSuggestions.bind(this));
    }
    
    
    
    public showSearchSuggestions(value: string): void
    {
        this.inputValue = value;

        this.resetSelectedButton();

        if (!value.isEmpty())
        {
            GoogleData.getSearchSuggestions(value, function(data: any)
            {
                if (this.currentSearchSuggestionsData === undefined)
                {
                    this.currentSearchSuggestionsData = data;
                }

                if (this.currentSearchSuggestionsData.executionTime <= data.executionTime && !this.inputValue.isEmpty())
                {
                    this.currentSearchSuggestionsData = data;

                    this.createSearchSuggestions(data.query.results.json.json[1]);
                }
            }.bind(this));
        }
        else
        {
            this.hideSearchSuggestions();
        }
    }

    public hideSearchSuggestions(): void
    {
        this.searchSuggestionsDiv.innerHTML = "";
    }

    public selectDownwards(): string
    {
        let searchSuggestionButtons: HTMLCollection = this.searchSuggestionsDiv.children;

        if (searchSuggestionButtons.length !== 0)
        {
            if (this.selectedButton === null)
            {
                this.selectedButton = 0;
            }
            else
            {
                let searchSuggestionButton: HTMLButtonElement = <HTMLButtonElement>searchSuggestionButtons.item(this.selectedButton);

                searchSuggestionButton.style.background = this.backgroundColor;
                searchSuggestionButton.style.color = this.fontColor;
                this.selectedButton++;

                if (this.selectedButton > Config.NumberOfSearchSuggestions.Value - 1 ||
                    this.selectedButton > searchSuggestionButtons.length - 1)
                {
                    this.selectedButton = null;

                    return this.inputValue;
                }
            }

            let searchSuggestionButton: HTMLButtonElement = <HTMLButtonElement>searchSuggestionButtons.item(this.selectedButton);

            searchSuggestionButton.style.background = this.backgroundColorFocus;
            searchSuggestionButton.style.color = this.fontColorFocus;

            return searchSuggestionButton.value;
        }
        else if (this.inputValue === undefined)
        {
            return "";
        }
        else
        {
            return this.inputValue;
        }
    }

    public selectUpwards(): string
    {
        let searchSuggestionButtons: HTMLCollection = this.searchSuggestionsDiv.children;

        if (searchSuggestionButtons.length != 0)
        {
            if (this.selectedButton === null)
            {
                if (Config.NumberOfSearchSuggestions.Value - 1 < searchSuggestionButtons.length - 1)
                {
                    this.selectedButton = Config.NumberOfSearchSuggestions.Value - 1;
                }
                else
                {
                    this.selectedButton = searchSuggestionButtons.length - 1;
                }
            }
            else
            {
                let searchSuggestionButton: HTMLButtonElement = <HTMLButtonElement>searchSuggestionButtons.item(this.selectedButton);

                searchSuggestionButton.style.background = this.backgroundColor;
                searchSuggestionButton.style.color = this.fontColor;
                this.selectedButton--;

                if (this.selectedButton < 0)
                {
                    this.selectedButton = null;

                    return this.inputValue;
                }
            }

            let searchSuggestionButton: HTMLButtonElement = <HTMLButtonElement>searchSuggestionButtons.item(this.selectedButton);

            searchSuggestionButton.style.background = this.backgroundColorFocus;
            searchSuggestionButton.style.color = this.fontColorFocus;

            return searchSuggestionButton.value;
        }
        else if (this.inputValue === null)
        {
            return "";
        }
        else
        {
            return this.inputValue;
        }
    }

    public addEventListener(name: string, callback: EventListener): void
    {
        window.addEventListener(name, callback);
    }

    public set BackgroundColor(value: string)
    {
        this.backgroundColor = value;
    }

    public set BackgroundColorFocus(value: string)
    {
        this.backgroundColorFocus = value;
    }

    public set FontColor(value: string)
    {
        this.fontColor = value;
    }

    public set FontColorFocus(value: string)
    {
        this.fontColorFocus = value;
    }



    private selectMouseOver(ev: MouseEvent): string
    {
        let searchSuggestionButtons: HTMLCollection = this.searchSuggestionsDiv.children;

        if (this.selectedButton !== null)
        {
            let searchSuggestionButton: HTMLButtonElement = <HTMLButtonElement>searchSuggestionButtons.item(this.selectedButton);

            searchSuggestionButton.style.background = this.backgroundColor;
            searchSuggestionButton.style.color = this.fontColor;
        }

        for (var i = 0; i < searchSuggestionButtons.length; i++)
        {
            let searchSuggestionButton: HTMLButtonElement = <HTMLButtonElement>searchSuggestionButtons.item(i);

            if (searchSuggestionButton.value === (<HTMLInputElement>ev.target).value)
            {
                this.selectedButton = i;
            }
        }

        if (this.selectedButton !== null)
        {
            let searchSuggestionButton: HTMLButtonElement = <HTMLButtonElement>searchSuggestionButtons.item(this.selectedButton);

            searchSuggestionButton.style.background = this.backgroundColorFocus;
            searchSuggestionButton.style.color = this.fontColorFocus;

            return searchSuggestionButton.value;
        }
        
        return "";
    }

    private resetSelectedButton(): void
    {
        if (this.selectedButton !== null)
        {
            let searchSuggestionButtons: HTMLCollection = this.searchSuggestionsDiv.children;

            if (searchSuggestionButtons !== undefined && this.selectedButton <= searchSuggestionButtons.length - 1)
            {
                let searchSuggestionButton: HTMLButtonElement = <HTMLButtonElement>searchSuggestionButtons.item(this.selectedButton);

                searchSuggestionButton.style.background = this.backgroundColor;
                searchSuggestionButton.style.color = this.fontColor;
            }

            this.selectedButton = null;
        }
    }

    private createSearchSuggestions(json: any): void
    {
        //Check for no result
        if (json !== null)
        {
            let results: any = json.json;
            let maxResults: number = Config.NumberOfSearchSuggestions.Value;

            this.searchSuggestionsDiv.innerHTML = "";

            if (results instanceof Array)
            {
                //Set max results
                if (maxResults > results.length)
                {
                    maxResults = results.length;
                }

                for (let i: number = 0; i < maxResults; i++)
                {
                    this.searchSuggestionsDiv.appendChild(this.createSearchSuggestion(results[i]));
                }
            }
            else if (results != this.inputValue)
            {
                this.searchSuggestionsDiv.appendChild(this.createSearchSuggestion(results));
            }
            else
            {
                this.searchSuggestionsDiv.innerHTML = "";
            }
        }
        else
        {
            this.searchSuggestionsDiv.innerHTML = "";
        }
    }

    private createSearchSuggestion(value: string): HTMLInputElement
    {
        let searchSuggestionButton: HTMLInputElement = document.createElement("input");

        searchSuggestionButton.className = "searchSuggestionButton";
        searchSuggestionButton.type = "button";
        searchSuggestionButton.value = value;
        searchSuggestionButton.style.backgroundColor = this.backgroundColor;
        searchSuggestionButton.style.color = this.fontColor;
        searchSuggestionButton.onmouseover = this.selectMouseOver.bind(this);
        searchSuggestionButton.onclick = this.mouseClicked.bind(this);

        return searchSuggestionButton;
    }

    private mouseClicked(ev: MouseEvent): void
    {
        ev.target.fireEvent("SearchSuggestionsClicked");
    }
}