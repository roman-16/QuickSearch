class CookieHandler
{
    public static saveItem(name: string, value: any): void
    {
        let stringValue: string = JSON.stringify(value);

        localStorage.setItem(name, stringValue);
    }

    public static getItem(name: string): any
    {
        let stringValue: string = localStorage.getItem(name);

        return JSON.parse(stringValue);
    }
}