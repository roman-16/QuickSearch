class Config
{
    private static homepage: ConfigValue<string> = new ConfigValue("homepage", "https://start.duckduckgo.com/?q=");
    private static linkStartsWith: ConfigValue<string[]> = new ConfigValue("linkStartsWith", ["http:", "https:", "www."]);
    private static quickSearchHotkeyStart: ConfigValue<string> = new ConfigValue("quickSearchHotkeyStart", "");
    private static quickSearch: ConfigValue<string[][]> = new ConfigValue("quickSearch", [["d", "https://start.duckduckgo.com/?q="], ["s", "https://startpage.com/do/search?query="],
                                                                              ["g", "https://encrypted.google.com/#q="], ["y", "https://youtube.com/results?search_query="],
                                                                              ["r", "https://reddit.com/search?q="], ["sr", "https://reddit.com/r/"],
                                                                              ["sx", "https://stackexchange.com/search?q="], ["so", "https://stackoverflow.com/search?q="],
                                                                              ["git", "https://github.com/search?q="], ["f", "https://www.facebook.com/public?query="],
                                                                              ["dict", "http://www.dict.cc/?s="]]);
    private static quickSearchHotkeyEnd: ConfigValue<string> = new ConfigValue("quickSearchHotkeyEnd", " ");
    private static useSearchSuggestions: ConfigValue<boolean> = new ConfigValue("useSearchSuggestions", true);
    private static numberOfSearchSuggestions: ConfigValue<number> = new ConfigValue("numberOfSearchSuggestions", 4);
    private static clockSeparator: ConfigValue<string> = new ConfigValue("clockSeparator", ":");
    private static shapeColor: ConfigValue<string> = new ConfigValue("shapeColor", "#3a5b83");



    public static reset(): void
    {
        localStorage.clear();
    }



    public static get Homepage(): ConfigValue<string>
    {
        return this.homepage;
    }

    public static get LinkStartsWith(): ConfigValue<string[]>
    {
        return this.linkStartsWith;
    }

    public static get QuickSearchHotkeyStart(): ConfigValue<string>
    {
        return this.quickSearchHotkeyStart;
    }

    public static get QuickSearch(): ConfigValue<string[][]>
    {
        //TODO: Create quickSearch object
        return this.quickSearch;
    }

    public static get QuickSearchHotkeyEnd(): ConfigValue<string>
    {
        return this.quickSearchHotkeyEnd;
    }

    public static get UseSearchSuggestions(): ConfigValue<boolean>
    {
        return this.useSearchSuggestions;
    }

    public static get NumberOfSearchSuggestions(): ConfigValue<number>
    {
        return this.numberOfSearchSuggestions;
    }

    public static get ClockSeparator(): ConfigValue<string>
    {
        return this.clockSeparator;
    }

    public static get ShapeColor(): ConfigValue<string>
    {
        return this.shapeColor;
    }
}