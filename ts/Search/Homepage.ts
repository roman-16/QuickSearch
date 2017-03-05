class Homepage
{
    protected homepage: string;
    protected quickSearchHotkeyStart: string;
    protected quickSearch: string[][];
    protected quickSearchHotkeyEnd: string;
    protected useQuickSearch: boolean;
    protected linkStartsWith: string[] = ["http:", "https:", "www."];


    
    public constructor(homepage: string, quickSearchHotkeyStart: string = "", quickSearch: string[][] = [["", ""]], quickSearchHotkeyEnd: string = "")
    {
        this.homepage = homepage;
        this.quickSearchHotkeyStart = quickSearchHotkeyStart;
        this.quickSearch = quickSearch;
        this.quickSearchHotkeyEnd = quickSearchHotkeyEnd;

        if (quickSearch === [["", ""]])
        {
            this.useQuickSearch = false;
        }
        else
        {
            this.useQuickSearch = true;
        }
    }


    
    public openHomepage(value: string = ""): void
    {
        //Open homepage
        if (value === "")
        {
            this.openURL(this.homepage);
            return;
        }

        //Test for quicksearch
        if (this.useQuickSearch)
        {
            let quickSearchHotkeys: string[] = this.quickSearch.getColumn(0);

            for (let i: number = 0; i < quickSearchHotkeys.length; i++)
            {
                quickSearchHotkeys[i] = this.quickSearchHotkeyStart + quickSearchHotkeys[i] + this.quickSearchHotkeyEnd;
            }

            for (var i = 0; i < quickSearchHotkeys.length; i++)
            {
                if (value.startsWith(quickSearchHotkeys[i]))
                {
                    this.openURL(this.quickSearch[i][1] + encodeURIComponent(value.replace(quickSearchHotkeys[i], "")));
                    return;
                }
            }
        }

        //Test for link
        if (value.startsWithAny(this.linkStartsWith))
        {
            this.openURL(value);
            return;
        }

        //Normal search
        this.openURL(this.homepage + encodeURIComponent(value));
    }

    public openURL(value: string): void
    {
        if (value.startsWith("www."))
        {
            window.open("http://" + value, "_self");
        }
        else
        {
            window.open(value, "_self");
        }
    }



    public set LinkStartsWith(value: string[])
    {
        this.linkStartsWith = value;
    }
}