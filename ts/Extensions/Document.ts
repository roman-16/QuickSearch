interface Document
{
    onClickOutside(div: HTMLDivElement, callback: Function): void;
}

Document.prototype.onClickOutside = function onClickOutside(div: HTMLDivElement, callback: Function): void
{
    document.addEventListener("mouseup", function (ev: MouseEvent)
    {
        if (!div.contains(<Node>ev.target))
        {
            callback();
        }
    }.bind(this));
}