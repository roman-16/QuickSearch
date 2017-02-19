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
