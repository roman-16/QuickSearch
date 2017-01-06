Menubar = function(parent)
{
    var me = this;
    var sidebar = new Sidebar(parent);



    init();
    function init()
    {
        sidebar.appendChild(createSettingIcon());

        for (var property in Config)
        {
            if (Config.hasOwnProperty(property))
            {
                sidebar.appendChild(createSetting(property));
            }
        }
    }

    function createSettingIcon()
    {
        var settingDiv = document.createElement("div");
        var settingIcon = document.createElement("i");
        var settingP = document.createElement("p");

        settingDiv.className = "settingDiv";
        settingDiv.style.width = "100%";
        settingIcon.className = "menuIcon fa fa-cog";
        settingIcon.style.fontSize = "200%";
        settingIcon.style.color = "#000000";
        settingP.className = "settingP";
        settingP.innerText = "Settings";
        settingP.style.fontSize = "200%";
        settingP.style.marginLeft = "10px";

        settingDiv.appendChild(settingIcon);
        settingDiv.appendChild(settingP);

        return settingDiv;
    }

    function createSetting(property)
    {
        var element;
        var value = Config[property];
        var type = value.toType();

        switch (type)
        {
            case "[object String]":
                element = new TextInput(property.upperFirstChar(), value).getElement();
                break;

            case "[object Array]":
                element = new TextInput(property.upperFirstChar(), value).getElement();
                break;
                
            case "[object Boolean]":
                element = new TextInput(property.upperFirstChar(), value).getElement();
                break;
                
            case "[object Number]":
                element = new TextInput(property.upperFirstChar(), value).getElement();
                break;
        }

        return element;
    }
}