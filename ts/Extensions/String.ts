interface String
{
    startsWith(value: string): boolean;
    startsWithAny(values: string[]): boolean;
    isEmpty(): boolean;
    upperFirstChar(): string;
}

String.prototype.startsWith = function startsWith(value: string): boolean
{
    return this.lastIndexOf(value, 0) === 0;
}

String.prototype.startsWithAny = function startsWithAny(values: string[]): boolean
{
    for (var i = 0; i < values.length; i++)
    {
        if (this.startsWith(values[i]))
        {
            return true;
        }
    }

    return false;
}

String.prototype.isEmpty = function isEmpty(): boolean
{
    return (this.length === 0 || !this.trim());
}

String.prototype.upperFirstChar = function upperFirstChar(): string
{
    return this.charAt(0).toUpperCase() + this.slice(1);
}