interface Element
{
    remove(): void;
}

Element.prototype.remove = function remove(): void
{
    this.parentElement.removeChild(this);
}