var SearchSuggestions = (function () {
    function SearchSuggestions(parent) {
        this.searchSuggestionsDiv = document.createElement("div");
        this.selectedButton = null;
        this.backgroundColor = "#757575";
        this.backgroundColorFocus = "#3a5b83";
        this.fontColor = "#000000";
        this.fontColorFocus = "#FFFFFF";
        this.parent = parent;
        this.searchSuggestionsDiv.className = "searchSuggestionsDiv";
        this.searchSuggestionsDiv.onmouseout = this.resetSelectedButton.bind(this);
        this.parent.appendChild(this.searchSuggestionsDiv);
        document.onClickOutside(this.searchSuggestionsDiv, this.hideSearchSuggestions.bind(this));
    }
    SearchSuggestions.prototype.showSearchSuggestions = function (value) {
        this.inputValue = value;
        this.resetSelectedButton();
        if (!value.isEmpty()) {
            GoogleData.getSearchSuggestions(value, function (data) {
                if (this.currentSearchSuggestionsData === undefined) {
                    this.currentSearchSuggestionsData = data;
                }
                if (this.currentSearchSuggestionsData.executionTime <= data.executionTime && !this.inputValue.isEmpty()) {
                    this.currentSearchSuggestionsData = data;
                    this.createSearchSuggestions(data.query.results.json.json[1]);
                }
            }.bind(this));
        }
        else {
            this.hideSearchSuggestions();
        }
    };
    SearchSuggestions.prototype.hideSearchSuggestions = function () {
        this.searchSuggestionsDiv.innerHTML = "";
    };
    SearchSuggestions.prototype.selectDownwards = function () {
        var searchSuggestionButtons = this.searchSuggestionsDiv.children;
        if (searchSuggestionButtons.length !== 0) {
            if (this.selectedButton === null) {
                this.selectedButton = 0;
            }
            else {
                var searchSuggestionButton_1 = searchSuggestionButtons.item(this.selectedButton);
                searchSuggestionButton_1.style.background = this.backgroundColor;
                searchSuggestionButton_1.style.color = this.fontColor;
                this.selectedButton++;
                if (this.selectedButton > Config.NumberOfSearchSuggestions.Value - 1 ||
                    this.selectedButton > searchSuggestionButtons.length - 1) {
                    this.selectedButton = null;
                    return this.inputValue;
                }
            }
            var searchSuggestionButton = searchSuggestionButtons.item(this.selectedButton);
            searchSuggestionButton.style.background = this.backgroundColorFocus;
            searchSuggestionButton.style.color = this.fontColorFocus;
            return searchSuggestionButton.value;
        }
        else if (this.inputValue === undefined) {
            return "";
        }
        else {
            return this.inputValue;
        }
    };
    SearchSuggestions.prototype.selectUpwards = function () {
        var searchSuggestionButtons = this.searchSuggestionsDiv.children;
        if (searchSuggestionButtons.length != 0) {
            if (this.selectedButton === null) {
                if (Config.NumberOfSearchSuggestions.Value - 1 < searchSuggestionButtons.length - 1) {
                    this.selectedButton = Config.NumberOfSearchSuggestions.Value - 1;
                }
                else {
                    this.selectedButton = searchSuggestionButtons.length - 1;
                }
            }
            else {
                var searchSuggestionButton_2 = searchSuggestionButtons.item(this.selectedButton);
                searchSuggestionButton_2.style.background = this.backgroundColor;
                searchSuggestionButton_2.style.color = this.fontColor;
                this.selectedButton--;
                if (this.selectedButton < 0) {
                    this.selectedButton = null;
                    return this.inputValue;
                }
            }
            var searchSuggestionButton = searchSuggestionButtons.item(this.selectedButton);
            searchSuggestionButton.style.background = this.backgroundColorFocus;
            searchSuggestionButton.style.color = this.fontColorFocus;
            return searchSuggestionButton.value;
        }
        else if (this.inputValue === null) {
            return "";
        }
        else {
            return this.inputValue;
        }
    };
    SearchSuggestions.prototype.addEventListener = function (name, callback) {
        window.addEventListener(name, callback);
    };
    Object.defineProperty(SearchSuggestions.prototype, "BackgroundColor", {
        set: function (value) {
            this.backgroundColor = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchSuggestions.prototype, "BackgroundColorFocus", {
        set: function (value) {
            this.backgroundColorFocus = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchSuggestions.prototype, "FontColor", {
        set: function (value) {
            this.fontColor = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchSuggestions.prototype, "FontColorFocus", {
        set: function (value) {
            this.fontColorFocus = value;
        },
        enumerable: true,
        configurable: true
    });
    SearchSuggestions.prototype.selectMouseOver = function (ev) {
        var searchSuggestionButtons = this.searchSuggestionsDiv.children;
        if (this.selectedButton !== null) {
            var searchSuggestionButton_3 = searchSuggestionButtons.item(this.selectedButton);
            searchSuggestionButton_3.style.background = this.backgroundColor;
            searchSuggestionButton_3.style.color = this.fontColor;
        }
        for (var i = 0; i < searchSuggestionButtons.length; i++) {
            var searchSuggestionButton_4 = searchSuggestionButtons.item(i);
            if (searchSuggestionButton_4.value === ev.target.value) {
                this.selectedButton = i;
            }
        }
        var searchSuggestionButton = searchSuggestionButtons.item(this.selectedButton);
        searchSuggestionButton.style.background = this.backgroundColorFocus;
        searchSuggestionButton.style.color = this.fontColorFocus;
        return searchSuggestionButton.value;
    };
    SearchSuggestions.prototype.resetSelectedButton = function () {
        if (this.selectedButton !== null) {
            var searchSuggestionButtons = this.searchSuggestionsDiv.children;
            if (searchSuggestionButtons !== undefined && this.selectedButton <= searchSuggestionButtons.length - 1) {
                var searchSuggestionButton = searchSuggestionButtons.item(this.selectedButton);
                searchSuggestionButton.style.background = this.backgroundColor;
                searchSuggestionButton.style.color = this.fontColor;
            }
            this.selectedButton = null;
        }
    };
    SearchSuggestions.prototype.createSearchSuggestions = function (json) {
        //Check for no result
        if (json !== null) {
            var results = json.json;
            var maxResults = Config.NumberOfSearchSuggestions.Value;
            this.searchSuggestionsDiv.innerHTML = "";
            if (results instanceof Array) {
                //Set max results
                if (maxResults > results.length) {
                    maxResults = results.length;
                }
                for (var i = 0; i < maxResults; i++) {
                    this.searchSuggestionsDiv.appendChild(this.createSearchSuggestion(results[i]));
                }
            }
            else if (results != this.inputValue) {
                this.searchSuggestionsDiv.appendChild(this.createSearchSuggestion(results));
            }
            else {
                this.searchSuggestionsDiv.innerHTML = "";
            }
        }
        else {
            this.searchSuggestionsDiv.innerHTML = "";
        }
    };
    SearchSuggestions.prototype.createSearchSuggestion = function (value) {
        var searchSuggestionButton = document.createElement("input");
        searchSuggestionButton.className = "searchSuggestionButton";
        searchSuggestionButton.type = "button";
        searchSuggestionButton.value = value;
        searchSuggestionButton.style.backgroundColor = this.backgroundColor;
        searchSuggestionButton.style.color = this.fontColor;
        searchSuggestionButton.onmouseover = this.selectMouseOver.bind(this);
        searchSuggestionButton.onclick = this.mouseClicked.bind(this);
        return searchSuggestionButton;
    };
    SearchSuggestions.prototype.mouseClicked = function (ev) {
        var event = new MouseEvent("SearchSuggestionsClicked", ev);
        ev.target.dispatchEvent(event);
    };
    return SearchSuggestions;
}());
