var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Search = (function (_super) {
    __extends(Search, _super);
    function Search(parent, homepage, quickSearchHotkeyStart, quickSearch, quickSearchHotkeyEnd) {
        if (quickSearchHotkeyStart === void 0) { quickSearchHotkeyStart = ""; }
        if (quickSearch === void 0) { quickSearch = [["", ""]]; }
        if (quickSearchHotkeyEnd === void 0) { quickSearchHotkeyEnd = ""; }
        var _this = _super.call(this, homepage, quickSearchHotkeyStart, quickSearch, quickSearchHotkeyEnd) || this;
        _this.searchDiv = document.createElement("div");
        _this.searchInputDiv = document.createElement("div");
        _this.searchInput = document.createElement("input");
        _this.searchSuggestionsDiv = document.createElement("div");
        _this.useSearchSuggestions = true;
        _this.backgroundColor = "#363636";
        _this.backgroundColorFocus = "#525252";
        _this.borderColor = "#363636";
        _this.borderColorFocus = "#525252";
        _this.fontColor = "#3a5b83";
        _this.fontColorFocus = "#000000";
        _this.parent = parent;
        _this.searchSuggestions = new SearchSuggestions(_this.searchSuggestionsDiv);
        _this.SearchSuggestions.listenToEvent("SearchSuggestionsClicked", _this.searchSuggestionClicked.bind(_this));
        _this.searchDiv.className = "searchDiv";
        _this.searchInputDiv.className = "searchInputDiv";
        _this.searchInput.className = "searchInput";
        _this.searchInput.type = "text";
        _this.searchInput.autocomplete = "off";
        _this.searchInput.autofocus = true;
        _this.searchInput.onkeyup = _this.keyPressed.bind(_this);
        _this.searchInput.onfocus = _this.focused.bind(_this);
        _this.searchInput.onblur = _this.blured.bind(_this);
        _this.searchSuggestionsDiv.className = "searchSuggestionsParentDiv";
        _this.searchDiv.appendChild(_this.searchInputDiv);
        _this.searchInputDiv.appendChild(_this.searchInput);
        _this.searchDiv.appendChild(_this.searchSuggestionsDiv);
        _this.parent.appendChild(_this.searchDiv);
        return _this;
    }
    Search.prototype.focus = function () {
        this.searchInput.focus();
    };
    Object.defineProperty(Search.prototype, "SearchSuggestions", {
        get: function () {
            return this.searchSuggestions;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Search.prototype, "UseSearchSuggestions", {
        set: function (value) {
            this.useSearchSuggestions = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Search.prototype, "BackgroundColor", {
        set: function (value) {
            this.backgroundColor = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Search.prototype, "BackgroundColorFocus", {
        set: function (value) {
            this.backgroundColorFocus = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Search.prototype, "BorderColor", {
        set: function (value) {
            this.borderColor = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Search.prototype, "BorderColorFocus", {
        set: function (value) {
            this.borderColorFocus = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Search.prototype, "FontColor", {
        set: function (value) {
            this.fontColor = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Search.prototype, "FontColorFocus", {
        set: function (value) {
            this.fontColorFocus = value;
        },
        enumerable: true,
        configurable: true
    });
    Search.prototype.keyPressed = function (ev) {
        var value = this.searchInput.value;
        if (ev.keyCode == 13) {
            this.openHomepage(value.trim());
        }
        else if (ev.keyCode == 34 || ev.keyCode == 40) {
            //Select lower search suggestion
            value = this.keepQuickSearchHotkey(value) + this.searchSuggestions.selectDownwards();
        }
        else if (ev.keyCode == 33 || ev.keyCode == 38) {
            //Select upper search suggestion
            value = this.keepQuickSearchHotkey(value) + this.searchSuggestions.selectUpwards();
        }
        else if (ev.keyCode == 27) {
            //Hide search suggestion on escape
            this.searchSuggestions.hideSearchSuggestions();
        }
        else if (this.useSearchSuggestions) {
            this.searchSuggestions.showSearchSuggestions(this.removeQuickSearchHotkey(value));
        }
        //TODO: Key up, set cursor to last position (rework feature like google)
        this.searchInput.focus();
        this.searchInput.value = value;
    };
    Search.prototype.focused = function (ev) {
        this.searchInput.style.backgroundColor = this.backgroundColorFocus;
        this.searchInput.style.borderColor = this.borderColorFocus;
        this.searchInput.style.color = this.fontColorFocus;
    };
    Search.prototype.blured = function (ev) {
        this.searchInput.style.backgroundColor = this.backgroundColor;
        this.searchInput.style.borderColor = this.borderColor;
        this.searchInput.style.color = this.fontColor;
    };
    Search.prototype.searchSuggestionClicked = function (target) {
        this.searchInput.value = this.keepQuickSearchHotkey(this.searchInput.value) + target.value;
        this.searchInput.focus();
        this.searchSuggestions.showSearchSuggestions(this.removeQuickSearchHotkey(this.searchInput.value));
    };
    Search.prototype.removeQuickSearchHotkey = function (value) {
        if (!this.useQuickSearch) {
            return value;
        }
        var quickSearchHotkeys = this.quickSearch.getColumn(0);
        for (var i = 0; i < quickSearchHotkeys.length; i++) {
            quickSearchHotkeys[i] = this.quickSearchHotkeyStart + quickSearchHotkeys[i] + this.quickSearchHotkeyEnd;
        }
        for (var i = 0; i < quickSearchHotkeys.length; i++) {
            if (value.startsWith(quickSearchHotkeys[i])) {
                return value.replace(quickSearchHotkeys[i], "");
            }
        }
        return value;
    };
    Search.prototype.keepQuickSearchHotkey = function (value) {
        if (!this.useQuickSearch) {
            return value;
        }
        var quickSearchHotkeys = this.quickSearch.getColumn(0);
        for (var i = 0; i < quickSearchHotkeys.length; i++) {
            quickSearchHotkeys[i] = this.quickSearchHotkeyStart + quickSearchHotkeys[i] + this.quickSearchHotkeyEnd;
        }
        for (var i = 0; i < quickSearchHotkeys.length; i++) {
            if (value.startsWith(quickSearchHotkeys[i])) {
                return quickSearchHotkeys[i];
            }
        }
        return "";
    };
    return Search;
}(Homepage));
