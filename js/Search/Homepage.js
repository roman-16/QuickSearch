var Homepage = (function () {
    function Homepage(homepage, quickSearchHotkeyStart, quickSearch, quickSearchHotkeyEnd) {
        if (quickSearchHotkeyStart === void 0) { quickSearchHotkeyStart = ""; }
        if (quickSearch === void 0) { quickSearch = [["", ""]]; }
        if (quickSearchHotkeyEnd === void 0) { quickSearchHotkeyEnd = ""; }
        this.linkStartsWith = ["http:", "https:", "www."];
        this.homepage = homepage;
        this.quickSearchHotkeyStart = quickSearchHotkeyStart;
        this.quickSearch = quickSearch;
        this.quickSearchHotkeyEnd = quickSearchHotkeyEnd;
        if (quickSearch === [["", ""]]) {
            this.useQuickSearch = false;
        }
        else {
            this.useQuickSearch = true;
        }
    }
    Homepage.prototype.openHomepage = function (value) {
        if (value === void 0) { value = ""; }
        //Open homepage
        if (value === "") {
            this.openURL(this.homepage);
            return;
        }
        //Test for quicksearch
        if (this.useQuickSearch) {
            var quickSearchHotkeys = this.quickSearch.getColumn(0);
            for (var i_1 = 0; i_1 < quickSearchHotkeys.length; i_1++) {
                quickSearchHotkeys[i_1] = this.quickSearchHotkeyStart + quickSearchHotkeys[i_1] + this.quickSearchHotkeyEnd;
            }
            for (var i = 0; i < quickSearchHotkeys.length; i++) {
                if (value.startsWith(quickSearchHotkeys[i])) {
                    this.openURL(this.quickSearch[i][1] + encodeURIComponent(value.replace(quickSearchHotkeys[i], "")));
                    return;
                }
            }
        }
        //Test for link
        if (value.startsWithAny(this.linkStartsWith)) {
            this.openURL(value);
            return;
        }
        //Normal search
        this.openURL(this.homepage + encodeURIComponent(value));
    };
    Homepage.prototype.openURL = function (value) {
        if (value.startsWith("www.")) {
            window.open("http://" + value, "_self");
        }
        else {
            window.open(value, "_self");
        }
    };
    Object.defineProperty(Homepage.prototype, "LinkStartsWith", {
        set: function (value) {
            this.linkStartsWith = value;
        },
        enumerable: true,
        configurable: true
    });
    return Homepage;
}());
