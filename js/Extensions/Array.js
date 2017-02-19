Array.prototype.getColumn = function getColumn(column) {
    var columns = [];
    for (var i = 0; i < this.length; i++) {
        columns.push(this[i][column]);
    }
    return columns;
};
