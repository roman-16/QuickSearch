Document.prototype.onClickOutside = function onClickOutside(div, callback) {
    document.addEventListener("mouseup", function (ev) {
        if (!div.contains(ev.target)) {
            callback();
        }
    }.bind(this));
};
