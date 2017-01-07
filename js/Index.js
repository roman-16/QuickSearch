var Index = new function()
{
    var menubar;
    var clock;
    var search;



    this.main = function()
    {
        init();
    }



    function init()
    {
        //var menubarParentDiv = document.getElementsByClassName("menubarParentDiv")[0];
        //menubar = new Menubar(menubarParentDiv);

        var clockParentDiv = document.getElementsByClassName("clockParentDiv")[0];
        clock = new Clock(clockParentDiv);
        
        clock.setSeparator(Config.clockSeparator);

        var searchParentDiv = document.getElementsByClassName("searchParentDiv")[0];
        search = new Search(searchParentDiv, Config.homepage, Config.quickSearchHotkeyStart, Config.quickSearch, Config.quickSearchHotkeyEnd);

        search.setLinkStartsWith(Config.linkStartsWith);
        search.setUseSearchSuggestions(Config.useSearchSuggestions);
        
        setColors();

        search.focus();

        //TODO: Create user interface for Config.js
        //TODO: Add facebook search
        //TODO: show current quicksearch
        //TODO: show help page
    }



    function setColors()
    {
        //Set body color
        document.body.style.backgroundColor = Config.backgroundColor;

        //Set clock color
        clock.setColor(Config.clockColor);

        //Set search input color
        search.setBackgroundColor(Config.searchInputBackgroundColor);
        search.setBackgroundColorFocus(Config.searchInputBackgroundColorFocus);
        search.setBorderColor(Config.searchInputBorderColor);
        search.setBorderColorFocus(Config.searchInputBorderColorFocus);
        search.setFontColor(Config.searchInputFontColor);
        search.setFontColorFocus(Config.searchInputFontColorFocus);

        //Set search suggestions color
        var searchSuggestions = search.getSearchSuggestions();

        searchSuggestions.setBackgroundColor(Config.searchSuggestionsBackgroundColor);
        searchSuggestions.setBackgroundColorFocus(Config.searchSuggestionsBackgroundColorFocus);
        searchSuggestions.setFontColor(Config.searchSuggestionsFontColor);
        searchSuggestions.setFontColorFocus(Config.searchSuggestionsFontColorFocus);
    }
}



window.onload = function()
{
    Index.main();
}
