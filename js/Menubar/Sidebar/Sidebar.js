var Sidebar = (function () {
    function Sidebar(parent) {
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
    Sidebar.prototype.addEventListener = function (name, callback) {
        window.addEventListener(name, callback);
    };
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
            this.updateElements();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sidebar.prototype, "ElementsBackgroundColorFocus", {
        set: function (value) {
            this.elementsBackgroundColorFocus = value;
            this.updateElements();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sidebar.prototype, "ElementsFontColor", {
        set: function (value) {
            this.elementsFontColor = value;
            this.updateElements();
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
            var event_1 = new CustomEvent("SidebarFirstExpand");
            window.dispatchEvent(event_1);
            this.isFirstExpanded = true;
        }
        this.menuIcon.style.opacity = "0.0";
        setTimeout(function () {
            //Change icon
            this.updateIconExpanded();
            //Display menubar
            this.menubarDiv.style.width = this.expandSize;
            this.menubarDiv.style.padding = "0em 1.5em 0em 0em";
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
        this.menuIcon.style.opacity = "initial";
        this.menuIcon.style.color = this.iconColorFocus;
    };
    Sidebar.prototype.updateIconReduced = function () {
        this.menuIcon.className = this.menuIcon.className.replace("fa-times", "fa-bars");
        this.menuIcon.style.opacity = "initial";
        this.menuIcon.style.color = this.iconColor;
    };
    Sidebar.prototype.updateElements = function () {
    };
    return Sidebar;
}());
