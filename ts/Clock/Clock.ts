class Clock
{
    private clockDiv: HTMLDivElement = document.createElement("div");
    private clock: HTMLElement = document.createElement("time");
    private separator: string = ":";
        

        
    public constructor(parent: HTMLDivElement)
    {
        this.clockDiv.className = "clockDiv";
        this.clock.className = "clock";

        parent.appendChild(this.clockDiv);

        this.clockDiv.appendChild(this.clock);

        this.initInterval();
    }



    private initInterval(): void
    {
        this.updateTime();
        setInterval(this.updateTime.bind(this), 10000);
    }
        
    private updateTime(): void
    {
        let date: Date = new Date();
        let hours: string = this.format(date.getHours());
        let minutes: string = this.format(date.getMinutes());

        this.clock.innerHTML = hours + this.separator + minutes;
    }

    private format(num: number): string
    {
        return ("0" + num.toString()).slice(-2);
    }

        

    public set Seperator(value: string)
    {
        this.separator = value;

        this.updateTime();
    }

    public set Color(value: string)
    {
        this.clock.style.color = value;

        this.updateTime();
    }
}