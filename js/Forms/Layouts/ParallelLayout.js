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
