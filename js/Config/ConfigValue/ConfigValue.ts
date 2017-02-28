class ConfigValue<T>
{
    private name: string;
    private value: T;



    public constructor(name: string, value: T)
    {
        this.name = name;

        if (this.isSavedValue())
            this.Value = this.loadValue();
        else
            this.Value = value;
    }



    public loadValue(): T
    {
        let stringifiedValue: string = localStorage.getItem(this.name) || "";

        this.value = JSON.parse(stringifiedValue);

        return this.value;
    }

    public saveValue(value: string): void
    {
        let stringifiedValue: string = JSON.stringify(value);

        localStorage.setItem(this.name, stringifiedValue);
    }

    public saveStringifiedValue(stringifiedValue: string): void
    {
        localStorage.setItem(this.name, stringifiedValue);
    }

    public isSavedValue(): boolean
    {
        return localStorage.getItem(this.name) !== null;
    }



    public get Name(): string
    {
        return this.name;
    }

    public get Value(): T
    {
        return this.value;
    }

    public set Value(value: T)
    {
        this.value = value;
    }

    public get StringifiedValue(): string
    {
        return JSON.stringify(this.value);
    }
}