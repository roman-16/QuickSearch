var Config = (function () {
    function Config() {
    }
    Config.reset = function () {
        localStorage.clear();
    };
    Object.defineProperty(Config, "Homepage", {
        get: function () {
            return this.homepage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Config, "LinkStartsWith", {
        get: function () {
            return this.linkStartsWith;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Config, "QuickSearchHotkeyStart", {
        get: function () {
            return this.quickSearchHotkeyStart;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Config, "QuickSearch", {
        get: function () {
            //TODO: Create quickSearch object
            return this.quickSearch;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Config, "QuickSearchHotkeyEnd", {
        get: function () {
            return this.quickSearchHotkeyEnd;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Config, "UseSearchSuggestions", {
        get: function () {
            return this.useSearchSuggestions;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Config, "NumberOfSearchSuggestions", {
        get: function () {
            return this.numberOfSearchSuggestions;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Config, "ClockSeparator", {
        get: function () {
            return this.clockSeparator;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Config, "ShapeColor", {
        get: function () {
            return this.shapeColor;
        },
        enumerable: true,
        configurable: true
    });
    return Config;
}());
Config.homepage = new ConfigValue("homepage", "https://start.duckduckgo.com/?q=");
Config.linkStartsWith = new ConfigValue("linkStartsWith", ["http:", "https:", "www."]);
Config.quickSearchHotkeyStart = new ConfigValue("quickSearchHotkeyStart", "");
Config.quickSearch = new ConfigValue("quickSearch", [["d", "https://start.duckduckgo.com/?q="], ["s", "https://startpage.com/do/search?query="],
    ["g", "https://encrypted.google.com/#q="], ["y", "https://youtube.com/results?search_query="],
    ["r", "https://reddit.com/search?q="], ["sr", "https://reddit.com/r/"],
    ["sx", "https://stackexchange.com/search?q="], ["so", "https://stackoverflow.com/search?q="],
    ["git", "https://github.com/search?q="], ["f", "https://www.facebook.com/public?query="]]);
Config.quickSearchHotkeyEnd = new ConfigValue("quickSearchHotkeyEnd", " ");
Config.useSearchSuggestions = new ConfigValue("useSearchSuggestions", true);
Config.numberOfSearchSuggestions = new ConfigValue("numberOfSearchSuggestions", 4);
Config.clockSeparator = new ConfigValue("clockSeparator", ":");
Config.shapeColor = new ConfigValue("shapeColor", "#3a5b83");
