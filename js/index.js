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
"use strict";
String.prototype.startsWith = function startsWith(value) {
    return this.lastIndexOf(value, 0) === 0;
};
String.prototype.startsWithAny = function startsWithAny(values) {
    for (var i = 0; i < values.length; i++) {
        if (this.startsWith(values[i])) {
            return true;
        }
    }
    return false;
};
String.prototype.isEmpty = function isEmpty() {
    return (this.length === 0 || !this.trim());
};
String.prototype.upperFirstChar = function upperFirstChar() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};
"use strict";
Array.prototype.getColumn = function getColumn(column) {
    var columns = [];
    for (var i = 0; i < this.length; i++) {
        columns.push(this[i][column]);
    }
    return columns;
};
"use strict";
Element.prototype.remove = function remove() {
    this.parentElement.removeChild(this);
};
"use strict";
Document.prototype.onClickOutside = function onClickOutside(div, callback) {
    document.addEventListener("mouseup", function (ev) {
        if (!div.contains(ev.target)) {
            callback();
        }
    }.bind(this));
};
"use strict";
var QuickEvent = (function () {
    function QuickEvent() {
        this.eventListeners = new Array();
    }
    QuickEvent.prototype.listen = function (callback) {
        this.eventListeners.push(callback);
    };
    QuickEvent.prototype.unlisten = function (callback) {
        var index = this.eventListeners.indexOf(callback);
        this.eventListeners.splice(index, 1);
    };
    QuickEvent.prototype.isListen = function (callback) {
        var index = this.eventListeners.indexOf(callback);
        return index !== -1;
    };
    QuickEvent.prototype.fire = function (eventArgs) {
        if (eventArgs === void 0) { eventArgs = {}; }
        for (var i = 0; i < this.eventListeners.length; i++) {
            this.eventListeners[i](eventArgs);
        }
    };
    return QuickEvent;
}());
"use strict";
var CookieHandler = (function () {
    function CookieHandler() {
    }
    CookieHandler.saveItem = function (name, value) {
        var stringValue = JSON.stringify(value);
        localStorage.setItem(name, stringValue);
    };
    CookieHandler.getItem = function (name) {
        var stringValue = localStorage.getItem(name) || "";
        return JSON.parse(stringValue);
    };
    return CookieHandler;
}());
"use strict";
var ConfigValue = (function () {
    function ConfigValue(name, value) {
        this.name = name;
        if (this.isSavedValue())
            this.Value = this.loadValue();
        else
            this.Value = value;
    }
    ConfigValue.prototype.loadValue = function () {
        var stringifiedValue = localStorage.getItem(this.name) || "";
        this.value = JSON.parse(stringifiedValue);
        return this.value;
    };
    ConfigValue.prototype.saveValue = function (value) {
        var stringifiedValue = JSON.stringify(value);
        localStorage.setItem(this.name, stringifiedValue);
    };
    ConfigValue.prototype.saveStringifiedValue = function (stringifiedValue) {
        localStorage.setItem(this.name, stringifiedValue);
    };
    ConfigValue.prototype.isSavedValue = function () {
        if (!navigator.cookieEnabled)
            return false;
        return localStorage.getItem(this.name) !== null;
    };
    Object.defineProperty(ConfigValue.prototype, "Name", {
        get: function () {
            return this.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigValue.prototype, "Value", {
        get: function () {
            return this.value;
        },
        set: function (value) {
            this.value = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigValue.prototype, "StringifiedValue", {
        get: function () {
            return JSON.stringify(this.value);
        },
        enumerable: true,
        configurable: true
    });
    return ConfigValue;
}());
"use strict";
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
    ["gh", "https://github.com/search?q="], ["f", "https://www.facebook.com/public?query="],
    ["dict", "http://www.dict.cc/?s="], ["ama","https://www.amazon.de/s/field-keywords="]]);
Config.quickSearchHotkeyEnd = new ConfigValue("quickSearchHotkeyEnd", " ");
Config.useSearchSuggestions = new ConfigValue("useSearchSuggestions", true);
Config.numberOfSearchSuggestions = new ConfigValue("numberOfSearchSuggestions", 4);
Config.clockSeparator = new ConfigValue("clockSeparator", ":");
Config.shapeColor = new ConfigValue("shapeColor", "#3a5b83");
"use strict";
var GoogleData = (function () {
    function GoogleData() {
    }
    GoogleData.getSearchSuggestions = function (value, callback) {
        var id = "i" + Math.random().toString(36).slice(2);
        var executionTime = window.performance.now();
        GoogleData.getSearchSuggestions[id] = function (data) {
            data.executionTime = executionTime;
            callback(data);
            delete GoogleData.getSearchSuggestions[id];
            var script = document.getElementById("searchSuggestionsQuery" + id);
            if (script !== null)
                script.remove();
        };
        var s = document.createElement("script");
        s.src = "https://suggestqueries.google.com/complete/search?client=chrome&q=" + encodeURIComponent(value) + "&callback=GoogleData.getSearchSuggestions." + id;
        s.id = "searchSuggestionsQuery" + id;
        document.getElementsByTagName("*")[1].appendChild(s);
    };
    return GoogleData;
}());
"use strict";
"use strict";
var ParallelLayout = (function () {
    function ParallelLayout(childDiv) {
        this.layout = document.createElement("div");
        this.layout.appendChild(childDiv);
    }
    ParallelLayout.prototype.appendChild = function (childDiv) {
        this.layout.appendChild(childDiv);
    };
    ParallelLayout.prototype.getElement = function () {
        return this.layout;
    };
    return ParallelLayout;
}());
"use strict";
"use strict";
"use strict";
"use strict";
var TextInput = (function () {
    function TextInput(name, defaultValue) {
        if (defaultValue === void 0) { defaultValue = ""; }
        this.textInputDiv = document.createElement("div");
        this.textInputP = document.createElement("p");
        this.textInput = document.createElement("input");
        this.backgroundColor = "#FFFFFF";
        this.fontColor = "#000000";
        this.textInputDiv.className = "textInputDiv";
        this.textInputDiv.style.width = "100%";
        this.textInputP.className = "textInputP";
        this.textInputP.innerText = name;
        this.textInputP.style.margin = "0px 10px 0px 0px";
        this.textInput.className = "textInput";
        this.textInput.value = defaultValue;
        this.textInput.type = "text";
        this.textInput.style.width = "40%";
        this.textInputDiv.appendChild(this.textInputP);
        this.textInputDiv.appendChild(this.textInput);
    }
    TextInput.prototype.getElement = function () {
        return this.textInputDiv;
    };
    TextInput.prototype.focus = function () {
        this.textInput.focus();
    };
    Object.defineProperty(TextInput.prototype, "Value", {
        get: function () {
            return this.textInput.value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextInput.prototype, "BackgroundColor", {
        set: function (value) {
            this.backgroundColor = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextInput.prototype, "FontColor", {
        set: function (value) {
            this.fontColor = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextInput.prototype, "Style", {
        get: function () {
            return this.textInput.style;
        },
        enumerable: true,
        configurable: true
    });
    return TextInput;
}());
"use strict";
var BigTextInput = (function () {
    function BigTextInput(name, defaultValue) {
        if (defaultValue === void 0) { defaultValue = ""; }
        this.bigTextInputDiv = document.createElement("div");
        this.bigTextInputP = document.createElement("p");
        this.bigTextInput = document.createElement("textarea");
        this.backgroundColor = "#FFFFFF";
        this.fontColor = "#000000";
        this.bigTextInputDiv.className = "bigTextInputDiv";
        this.bigTextInputDiv.style.width = "100%";
        this.bigTextInputP.className = "textInputP";
        this.bigTextInputP.innerText = name;
        this.bigTextInputP.style.margin = "0px 10px 0px 0px";
        this.bigTextInput.className = "bigTextInput";
        this.bigTextInput.value = defaultValue;
        this.bigTextInputDiv.appendChild(this.bigTextInputP);
        this.bigTextInputDiv.appendChild(this.bigTextInput);
    }
    BigTextInput.prototype.getElement = function () {
        return this.bigTextInputDiv;
    };
    BigTextInput.prototype.focus = function () {
        this.bigTextInput.focus();
    };
    Object.defineProperty(BigTextInput.prototype, "Value", {
        get: function () {
            return this.bigTextInput.value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BigTextInput.prototype, "BackgroundColor", {
        set: function (value) {
            this.backgroundColor = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BigTextInput.prototype, "FontColor", {
        set: function (value) {
            this.fontColor = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BigTextInput.prototype, "Style", {
        get: function () {
            return this.bigTextInput.style;
        },
        enumerable: true,
        configurable: true
    });
    return BigTextInput;
}());
"use strict";
var Button = (function () {
    function Button(value) {
        this.onClick = new QuickEvent();
        this.buttonDiv = document.createElement("div");
        this.button = document.createElement("button");
        this.isHovered = false;
        this.backgroundColor = "#FFFFFF";
        this.backgroundColorHover = "#000000";
        this.fontColor = "#000000";
        this.fontColorHover = "#FFFFFF";
        this.value = value;
        this.buttonDiv.className = "buttonDiv";
        this.buttonDiv.style.width = "100%";
        this.button.className = "button";
        this.button.innerText = value;
        this.button.onclick = this.mouseClicked.bind(this);
        this.button.onmouseover = this.hovered.bind(this);
        this.button.onmouseout = this.blured.bind(this);
        this.button.style.border = "0px";
        this.button.style.padding = "10px 10px 10px 10px";
        this.button.style.backgroundColor = this.backgroundColor;
        this.buttonDiv.appendChild(this.button);
    }
    Button.prototype.getElement = function () {
        return this.buttonDiv;
    };
    Button.prototype.mouseClicked = function (ev) {
        this.onClick.fire(this);
    };
    Button.prototype.hovered = function () {
        this.isHovered = true;
        this.updateButton();
    };
    Button.prototype.blured = function () {
        this.isHovered = false;
        this.updateButton();
    };
    Button.prototype.updateButton = function () {
        if (this.isHovered) {
            this.button.style.backgroundColor = this.backgroundColorHover;
            this.button.style.color = this.fontColorHover;
        }
        else {
            this.button.style.backgroundColor = this.backgroundColor;
            this.button.style.color = this.fontColor;
        }
    };
    Object.defineProperty(Button.prototype, "BackgroundColor", {
        set: function (value) {
            this.backgroundColor = value;
            this.updateButton();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Button.prototype, "BackgroundColorHover", {
        set: function (value) {
            this.backgroundColorHover = value;
            this.updateButton();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Button.prototype, "FontColor", {
        set: function (value) {
            this.fontColor = value;
            this.updateButton();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Button.prototype, "FontColorHover", {
        set: function (value) {
            this.fontColorHover = value;
            this.updateButton();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Button.prototype, "Margin", {
        set: function (value) {
            this.buttonDiv.style.margin = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Button.prototype, "Style", {
        get: function () {
            return this.button.style;
        },
        enumerable: true,
        configurable: true
    });
    return Button;
}());
"use strict";
var InformationBox = (function () {
    function InformationBox() {
    }
    InformationBox.init = function () {
        if (!InformationBox.isInit) {
            InformationBox.informationDiv.className = "infoDiv";
            InformationBox.informationDiv.style.display = "none";
            InformationBox.innerInformationDiv.className = "innerInfoDiv";
            InformationBox.informationText.className = "infoText";
            InformationBox.innerInformationDiv.appendChild(InformationBox.informationText);
            InformationBox.informationDiv.appendChild(InformationBox.innerInformationDiv);
            document.body.appendChild(InformationBox.informationDiv);
            InformationBox.isInit = true;
        }
    };
    InformationBox.showText = function (text, timeout) {
        if (timeout === void 0) { timeout = 2000; }
        this.init();
        this.informationText.innerText = text;
        this.informationDiv.style.display = "inline";
        setTimeout(function () {
            this.informationDiv.style.display = "none";
            this.onTextClose.fire(this);
        }.bind(this), timeout);
    };
    return InformationBox;
}());
InformationBox.onTextClose = new QuickEvent();
InformationBox.isInit = false;
InformationBox.informationDiv = document.createElement("div");
InformationBox.innerInformationDiv = document.createElement("div");
InformationBox.informationText = document.createElement("p");
"use strict";
var Clock = (function () {
    function Clock(parent) {
        this.clockDiv = document.createElement("div");
        this.clock = document.createElement("time");
        this.separator = ":";
        this.clockDiv.className = "clockDiv";
        this.clock.className = "clock";
        parent.appendChild(this.clockDiv);
        this.clockDiv.appendChild(this.clock);
        this.initInterval();
    }
    Clock.prototype.initInterval = function () {
        this.updateTime();
        setInterval(this.updateTime.bind(this), 10000);
    };
    Clock.prototype.updateTime = function () {
        var date = new Date();
        var hours = this.format(date.getHours());
        var minutes = this.format(date.getMinutes());
        this.clock.innerHTML = hours + this.separator + minutes;
    };
    Clock.prototype.format = function (num) {
        return ("0" + num.toString()).slice(-2);
    };
    Object.defineProperty(Clock.prototype, "Seperator", {
        set: function (value) {
            this.separator = value;
            this.updateTime();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Clock.prototype, "Color", {
        set: function (value) {
            this.clock.style.color = value;
            this.updateTime();
        },
        enumerable: true,
        configurable: true
    });
    return Clock;
}());
"use strict";
var SearchSuggestions = (function () {
    function SearchSuggestions(parent) {
        this.onSuggestionClick = new QuickEvent();
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
                    this.createSearchSuggestions(data[1]);
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
            var searchSuggestionButton = searchSuggestionButtons.item(this.selectedButton);
            searchSuggestionButton.style.background = this.backgroundColor;
            searchSuggestionButton.style.color = this.fontColor;
        }
        for (var i = 0; i < searchSuggestionButtons.length; i++) {
            var searchSuggestionButton = searchSuggestionButtons.item(i);
            if (searchSuggestionButton.value === ev.target.value) {
                this.selectedButton = i;
            }
        }
        if (this.selectedButton !== null) {
            var searchSuggestionButton = searchSuggestionButtons.item(this.selectedButton);
            searchSuggestionButton.style.background = this.backgroundColorFocus;
            searchSuggestionButton.style.color = this.fontColorFocus;
            return searchSuggestionButton.value;
        }
        return "";
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
    SearchSuggestions.prototype.createSearchSuggestions = function (data) {
        //Check for no result
        if (data !== null) {
            var results = data;
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
        this.onSuggestionClick.fire(ev.target);
    };
    return SearchSuggestions;
}());
"use strict";
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
        //Test for quicksearch
        if (this.useQuickSearch) {
            var quickSearchHotkeys = this.quickSearch.getColumn(0);
            for (var i_1 = 0; i_1 < quickSearchHotkeys.length; i_1++) {
                quickSearchHotkeys[i_1] = this.quickSearchHotkeyStart + quickSearchHotkeys[i_1] + this.quickSearchHotkeyEnd;
            }
            for (var i = 0; i < quickSearchHotkeys.length; i++) {
                if (value.startsWith(quickSearchHotkeys[i])) {
                    window.open(this.quickSearch[i][1] + encodeURIComponent(value.replace(quickSearchHotkeys[i], "")), "_self");
                    return;
                }
            }
        }
        //Test for link
        if (this.isURL(value)) {
            if (!value.startsWith("http")) {
                window.open("http://" + value, "_self");
            }
            else {
                window.open(value, "_self");
            }
            return;
        }
        //Normal search
        window.open(this.homepage + encodeURIComponent(value), "_self");
    };
    Homepage.prototype.isURL = function (url) {
        var regex = new RegExp(/^([-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?)$/gmi);
        return regex.test(url);
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
"use strict";
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
        _this.shapeColor = "#3a5b83";
        _this.parent = parent;
        _this.searchSuggestions = new SearchSuggestions(_this.searchSuggestionsDiv);
        _this.searchSuggestions.onSuggestionClick.listen(_this.searchSuggestionClicked.bind(_this));
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
    Object.defineProperty(Search.prototype, "ShapeColor", {
        set: function (value) {
            this.shapeColor = value;
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
        this.searchInput.style.backgroundColor = "#525252";
        this.searchInput.style.borderColor = "#525252";
        this.searchInput.style.color = "#000000";
    };
    Search.prototype.blured = function (ev) {
        this.searchInput.style.backgroundColor = "#363636";
        this.searchInput.style.borderColor = this.shapeColor;
        this.searchInput.style.color = this.shapeColor;
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
"use strict";
var Sidebar = (function () {
    function Sidebar(parent) {
        this.onFirstExpand = new QuickEvent();
        this.sidebarDiv = document.createElement("div");
        this.menuIcon = document.createElement("i");
        this.menuButton = document.createElement("button");
        this.menubarDiv = document.createElement("div");
        this.inputChildren = new Array();
        this.isExpanded = false;
        this.isFirstExpanded = false;
        this.expandTime = 200;
        this.expandSize = "40%";
        this.backgroundColor = "#525252";
        this.iconColor = "#3a5b83";
        this.iconColorFocus = "#000000";
        this.elementsBackgroundColor = "#757575";
        this.elementsBackgroundColorFocus = "#3a5b83";
        this.elementsFontColor = "#525252";
        this.parent = parent;
        this.sidebarDiv.className = "sidebarDiv";
        this.menuButton.className = "menuButton";
        this.menuButton.onclick = this.clicked.bind(this);
        this.menuIcon.className = "menuIcon fa fa-bars fa-lg";
        this.menuIcon.style.transition = "opacity " + this.expandTime + "ms";
        this.menubarDiv.className = "menubarDiv";
        this.menubarDiv.style.transition = "width " + this.expandTime + "ms";
        this.update();
        this.menuButton.appendChild(this.menuIcon);
        this.sidebarDiv.appendChild(this.menuButton);
        this.sidebarDiv.appendChild(this.menubarDiv);
        this.parent.appendChild(this.sidebarDiv);
        document.onClickOutside(this.menubarDiv, this.reduce.bind(this));
    }
    Sidebar.prototype.appendChild = function (child) {
        this.menubarDiv.appendChild(child);
    };
    Sidebar.prototype.appendInput = function (input) {
        this.inputChildren.push(input);
        this.menubarDiv.appendChild(input.getElement());
    };
    Sidebar.prototype.appendButton = function (button) {
        this.menubarDiv.appendChild(button.getElement());
    };
    Sidebar.prototype.appendLayout = function (layout) {
        this.menubarDiv.appendChild(layout.getElement());
    };
    Object.defineProperty(Sidebar.prototype, "BackgroundColor", {
        set: function (value) {
            this.backgroundColor = value;
            this.updateBackground();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sidebar.prototype, "IconColor", {
        set: function (value) {
            this.iconColor = value;
            this.updateIcon();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sidebar.prototype, "IconColorFocus", {
        set: function (value) {
            this.iconColorFocus = value;
            this.updateIcon();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sidebar.prototype, "ElementsBackgroundColor", {
        set: function (value) {
            this.elementsBackgroundColor = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sidebar.prototype, "ElementsBackgroundColorFocus", {
        set: function (value) {
            this.elementsBackgroundColorFocus = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sidebar.prototype, "ElementsFontColor", {
        set: function (value) {
            this.elementsFontColor = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sidebar.prototype, "InputChildren", {
        get: function () {
            return this.inputChildren;
        },
        enumerable: true,
        configurable: true
    });
    Sidebar.prototype.clicked = function (ev) {
        if (this.isExpanded) {
            this.reduce();
        }
        else {
            this.expand();
            this.menubarDiv.focus();
        }
    };
    Sidebar.prototype.expand = function () {
        if (!this.isFirstExpanded) {
            //Fire event
            this.onFirstExpand.fire(this);
            this.isFirstExpanded = true;
        }
        this.menuIcon.style.opacity = "0.0";
        setTimeout(function () {
            //Change icon
            this.updateIconExpanded();
            //Display menubar
            this.menubarDiv.style.width = this.expandSize;
            this.menubarDiv.style.padding = "0em 1.5em 0em 0em";
            this.menubarDiv.style.overflowY = "auto";
            setTimeout(function () {
                this.isExpanded = true;
            }.bind(this), this.expandTime);
        }.bind(this), this.expandTime);
    };
    Sidebar.prototype.reduce = function () {
        if (!this.isExpanded)
            return;
        this.menuIcon.style.opacity = "0.0";
        setTimeout(function () {
            //Hide menubar
            this.menubarDiv.style.overflowY = "hidden";
            this.menubarDiv.style.padding = "0em 0em 0em 0em";
            this.menubarDiv.style.width = "0%";
            //Change icon
            this.updateIconReduced();
            this.isExpanded = false;
        }.bind(this), this.expandTime);
    };
    Sidebar.prototype.update = function () {
        this.updateBackground();
        this.updateIcon();
    };
    Sidebar.prototype.updateBackground = function () {
        this.menubarDiv.style.backgroundColor = this.backgroundColor;
    };
    Sidebar.prototype.updateIcon = function () {
        if (this.isExpanded) {
            this.updateIconExpanded();
        }
        else {
            this.updateIconReduced();
        }
    };
    Sidebar.prototype.updateIconExpanded = function () {
        this.menuIcon.className = this.menuIcon.className.replace("fa-bars", "fa-times");
        this.menuIcon.style.opacity = "1.0";
        this.menuIcon.style.color = this.iconColorFocus;
    };
    Sidebar.prototype.updateIconReduced = function () {
        this.menuIcon.className = this.menuIcon.className.replace("fa-times", "fa-bars");
        this.menuIcon.style.opacity = "1.0";
        this.menuIcon.style.color = this.iconColor;
    };
    return Sidebar;
}());
"use strict";
var Menubar = (function () {
    function Menubar(parent) {
        this.configChildren = new Array();
        this.parent = parent;
        this.sidebar = new Sidebar(this.parent);
        this.sidebar.onFirstExpand.listen(this.addElements.bind(this));
    }
    Object.defineProperty(Menubar.prototype, "Sidebar", {
        get: function () {
            return this.sidebar;
        },
        enumerable: true,
        configurable: true
    });
    Menubar.prototype.addElements = function () {
        this.sidebar.appendChild(this.createSettingIcon());
        this.appendConfig("Homepage", Config.Homepage);
        this.appendConfig("Link start with", Config.LinkStartsWith);
        this.appendConfig("Quicksearch hotkey starts with", Config.QuickSearchHotkeyStart);
        this.appendConfig("Quicksearch", Config.QuickSearch);
        this.appendConfig("Quicksearch Hotkey Ends with", Config.QuickSearchHotkeyEnd);
        this.appendConfig("Use search suggestions", Config.UseSearchSuggestions);
        this.appendConfig("Number of search suggestions", Config.NumberOfSearchSuggestions);
        this.appendConfig("Clock separator", Config.ClockSeparator);
        this.appendConfig("Color", Config.ShapeColor);
        this.saveButton = new Button("Save");
        this.saveButton.BackgroundColorHover = Config.ShapeColor.Value;
        this.saveButton.Margin = "0px 20px 0px 0px";
        this.saveButton.onClick.listen(this.saveClicked.bind(this));
        this.resetButton = new Button("Reset");
        this.resetButton.BackgroundColorHover = Config.ShapeColor.Value;
        this.resetButton.onClick.listen(this.resetClicked.bind(this));
        this.buttonLayout = new ParallelLayout(this.saveButton.getElement());
        this.buttonLayout.appendChild(this.resetButton.getElement());
        this.sidebar.appendLayout(this.buttonLayout);
    };
    Menubar.prototype.createSettingIcon = function () {
        var settingDiv = document.createElement("div");
        var settingIcon = document.createElement("i");
        var settingP = document.createElement("p");
        settingDiv.className = "settingDiv";
        settingDiv.style.width = "100%";
        settingIcon.className = "menuIcon fa fa-cog";
        settingIcon.style.fontSize = "200%";
        settingIcon.style.color = "#000000";
        settingP.className = "settingP";
        settingP.innerText = "Settings";
        settingP.style.fontSize = "200%";
        settingP.style.marginLeft = "10px";
        settingDiv.appendChild(settingIcon);
        settingDiv.appendChild(settingP);
        return settingDiv;
    };
    Menubar.prototype.appendConfig = function (name, config) {
        var value = config.StringifiedValue;
        var input;
        if (value.length > 40) {
            input = new BigTextInput(name, value);
            input.Style.height = "8rem";
            input.Style.width = "70%";
            input.Style.maxWidth = "85%";
        }
        else {
            input = new TextInput(name, value);
        }
        this.sidebar.appendInput(input);
        this.configChildren.push(config);
    };
    Menubar.prototype.saveClicked = function (target) {
        if (!navigator.cookieEnabled) {
            InformationBox.showText("You need to enable cookies!", 2000);
            return;
        }
        var inputChildren = this.sidebar.InputChildren;
        for (var i = 0; i < inputChildren.length; i++) {
            try {
                this.configChildren[i].Value = JSON.parse(inputChildren[i].Value);
            }
            catch (e) {
                inputChildren[i].Style.transition = "box-shadow 0s";
                inputChildren[i].Style.boxShadow = "0px 0px 8px #ff0000";
                //Focus must be here else this won't work
                inputChildren[i].focus();
                inputChildren[i].Style.transition = "box-shadow 5s";
                inputChildren[i].Style.boxShadow = "0px 0px 0px #000000";
                return;
            }
            this.configChildren[i].saveStringifiedValue(inputChildren[i].Value);
        }
        InformationBox.showText("Saved!", 1000);
        InformationBox.onTextClose.listen(function () {
            location.reload();
        }.bind(this));
    };
    Menubar.prototype.resetClicked = function (target) {
        if (!navigator.cookieEnabled) {
            InformationBox.showText("You need to enable cookies!", 2000);
            return;
        }
        Config.reset();
        InformationBox.showText("Reseted!", 1000);
        InformationBox.onTextClose.listen(function () {
            location.reload();
        }.bind(this));
    };
    return Menubar;
}());
"use strict";
window.onload = function () {
    Index.main();
};
var Index = (function () {
    function Index() {
    }
    Index.main = function () {
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
        //TODO: show current quicksearch
        //TODO: show help page
        //TODO: Show little popup ("search something...") on first start
        //TODO: save visited websites and put them in the searchbox on search (but not in the searchsuggestion)
    };
    Index.setColors = function () {
        //Set body color
        document.body.style.backgroundColor = "#363636";
        //Set clock color
        this.clock.Color = Config.ShapeColor.Value;
        //Set search input color
        //FIXME: strange color on reload
        this.search.ShapeColor = Config.ShapeColor.Value;
        //this.search.BorderColor = Config.ShapeColor.Value;
        //this.search.FontColor = Config.ShapeColor.Value;
        //Set search suggestions color
        var searchSuggestions = this.search.SearchSuggestions;
        searchSuggestions.BackgroundColorFocus = Config.ShapeColor.Value;
        //Set menubar color
        var sidebar = this.menubar.Sidebar;
        sidebar.ElementsBackgroundColorFocus = Config.ShapeColor.Value;
        sidebar.IconColor = Config.ShapeColor.Value;
    };
    return Index;
}());
//# sourceMappingURL=index.js.map
