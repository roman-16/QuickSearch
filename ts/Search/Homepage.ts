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
                    window.open(this.quickSearch[i][1] + encodeURIComponent(value.replace(quickSearchHotkeys[i], "")), "_self");
                    return;
                }
            }
        }

        //Test for link
        if (this.isURL(value))
        {
            if (!value.startsWith("http"))
            {
                window.open("http://" + value, "_self");
            }
            else
            {
                window.open(value, "_self");
            }
            return;
        }

        //Normal search
        window.open(this.homepage + encodeURIComponent(value), "_self");
    }



    private isURL(url: string): boolean
    {
        let regex: RegExp = new RegExp(/^([-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?)$/gmi);

        return regex.test(url);
    }



    public set LinkStartsWith(value: string[])
    {
        this.linkStartsWith = value;
    }
}