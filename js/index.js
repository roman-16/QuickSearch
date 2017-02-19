window.onload = function () {
    Index.Main();
};
var Index = (function () {
    function Index() {
    }
    Index.Main = function () {
        this.removeEnableJavaScript();
        //Clock
        var clockParentDiv = document.getElementsByClassName("clockParentDiv")[0];
        this.clock = new Clock(clockParentDiv);
        this.clock.Seperator = Config.ClockSeparator.Value;
        //Search
        var searchParentDiv = document.getElementsByClassName("searchParentDiv")[0];
        this.search = new Search(searchParentDiv, Config.Homepage.Value, Config.QuickSearchHotkeyStart.Value, Config.QuickSearch.Value, Config.QuickSearchHotkeyEnd.Value);
        this.search.LinkStartsWith = Config.LinkStartsWith.Value;
        this.search.UseSearchSuggestions = Config.UseSearchSuggestions.Value;
        //Menubar
        var menubarParentDiv = document.getElementsByClassName("menubarParentDiv")[0];
        this.menubar = new Menubar(menubarParentDiv);
        this.setColors();
        this.search.focus();
        //TODO: Create user interface for Config.js
        //TODO: show current quicksearch
        //TODO: show help page
        //TODO: Show little popup ("search something...") on first start
        //TODO: Rework link detection
        //TODO: save visited websites and put them in the searchbox on search (but not in the searchsuggestion)
    };
    Index.removeEnableJavaScript = function () {
        document.getElementsByClassName("javascriptDiv")[0].remove();
    };
    Index.setColors = function () {
        //Set body color
        document.body.style.backgroundColor = "#363636";
        //Set clock color
        this.clock.Color = Config.ShapeColor.Value;
        //Set search input color
        //FIXME: strange color on reload
        //this.search.BackgroundColor = Config.BasicColor.Value;
        //this.search.BackgroundColorFocus = Config.BasicColorFocus.Value;
        this.search.BorderColor = Config.ShapeColor.Value;
        //this.search.BorderColorFocus = Config.BasicColorFocus.Value;
        this.search.FontColor = Config.ShapeColor.Value;
        //this.search.FontColorFocus = Config.BasicShapeColorFocus.Value;
        //Set search suggestions color
        var searchSuggestions = this.search.SearchSuggestions;
        //searchSuggestions.BackgroundColor = Config.SecondColor.Value;
        searchSuggestions.BackgroundColorFocus = Config.ShapeColor.Value;
        //searchSuggestions.FontColor = Config.BasicShapeColorFocus.Value;
        //searchSuggestions.FontColorFocus = Config.BasicShapeColorFocus.Value;
        //Set menubar color
        var sidebar = this.menubar.Sidebar;
        //sidebar.BackgroundColor = Config.BasicColorFocus.Value;
        //sidebar.IconColor = Config.BasicShapeColor.Value;
        //sidebar.IconColorFocus = Config.BasicShapeColorFocus.Value;
        //sidebar.ElementsBackgroundColor = Config.SecondColor.Value;
        sidebar.ElementsBackgroundColorFocus = Config.ShapeColor.Value;
        sidebar.IconColor = Config.ShapeColor.Value;
        //sidebar.ElementsFontColor = Config.BasicColorFocus.Value;
    };
    return Index;
}());
