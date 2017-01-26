var Config = new function()
{
    this.homepage = "https://start.duckduckgo.com/?q=";
    this.linkStartsWith = ["http:", "https:", "www."];
    this.quickSearchHotkeyStart = "";
    this.quickSearch = [["d", "https://start.duckduckgo.com/?q="], ["s", "https://startpage.com/do/search?query="],
                        ["g", "https://encrypted.google.com/#q="], ["y", "https://youtube.com/results?search_query="],
                        ["r", "https://reddit.com/search?q="], ["sr", "https://reddit.com/r/"], 
                        ["sx", "https://stackexchange.com/search?q="], ["so", "https://stackoverflow.com/search?q="],
                        ["git", "https://github.com/search?q="], ["dict", "https://www.dict.cc/?s="],
                        ["wiki", "https://wikipedia.org/w/index.php?search="]];
    this.quickSearchHotkeyEnd = " ";
    this.useSearchSuggestions = true;
    this.numberOfSearchSuggestions = 4;
    this.clockSeparator = ":";
    this.backgroundColor = "#363636";
    this.clockColor = "#3a5b83";
    this.searchInputBackgroundColor = "#363636";
    this.searchInputBackgroundColorFocus = "#525252";
    this.searchInputBorderColor = "#3a5b83";
    this.searchInputBorderColorFocus = "#525252";
    this.searchInputFontColor = "#3a5b83";
    this.searchInputFontColorFocus = "#000000";
    this.searchSuggestionsBackgroundColor = "#757575";
    this.searchSuggestionsBackgroundColorFocus = "#3a5b83";
    this.searchSuggestionsFontColor = "#000000";
    this.searchSuggestionsFontColorFocus = "#000000";
}
