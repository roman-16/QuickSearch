interface Array<T>
{
    getColumn(column: number): any;
}

Array.prototype.getColumn = function getColumn(column: number): any
{
    let columns: any = [];

    for (let i: number = 0; i < this.length; i++)
    {
        columns.push(this[i][column]);
    }

    return columns;
}