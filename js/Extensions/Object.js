Object.prototype.isArray = function isArray()
{
    if (Object.prototype.toString.call(this) === "[object Array]")
    {
        return true;
    }
    else
    {
        return false;
    }
}

Object.prototype.toType = function toType()
{
    return Object.prototype.toString.call(this);
}