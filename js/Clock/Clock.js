Clock = function(parent)
{
	var me = this;
    var clockDiv = document.createElement("div");
    var clock = document.createElement("time");
    var separator = ":";

    

    this.updateTime = function()
    {
        var date = new Date();
        var hours = pad(date.getHours());
        var minutes = pad(date.getMinutes());
        clock.innerHTML = hours + separator + minutes;
    }

    this.setSeparator = function(value)
    {
        separator = value;
        
        me.updateTime();
    }

    this.setColor = function(value)
    {
        clock.style.color = value;

        me.updateTime();
    }



    init();
    function init()
    {
        clockDiv.className = "clockDiv";
        clock.className = "clock";

        parent.appendChild(clockDiv);
        clockDiv.appendChild(clock);
        
        initInterval();
    }

    function initInterval()
    {
        me.updateTime();
        setInterval(me.updateTime, 10000);
    }

    function pad(num)
    {
        return ('0' + num.toString()).slice(-2);
    }
}