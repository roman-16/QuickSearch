Sidebar = function(parent)
{
    var me = this;
    var sidebarDiv = document.createElement("div");
    var menuIcon = document.createElement("i");
    var menuButton = document.createElement("button");
    var menubarDiv = document.createElement("div");
    var isExpanded = false;
    var expandTime = 200;
    var expandSize = "40%";



    this.appendChild = function(child)
    {
        menubarDiv.appendChild(child);
    }



    init();
    function init()
    {
        sidebarDiv.className = "sidebarDiv";
        menubarDiv.className = "menubarDiv";
        menubarDiv.style.transition = "width " + expandTime + "ms";
        menuButton.className = "menuButton";
        menuButton.onclick = clicked;
        document.onclick = documentClick;
        menuIcon.className = "menuIcon fa fa-bars fa-lg";
        menuIcon.style.transition = "opacity " + expandTime + "ms";

        menuButton.appendChild(menuIcon);
        sidebarDiv.appendChild(menuButton);
        sidebarDiv.appendChild(menubarDiv);
        parent.appendChild(sidebarDiv);
    }

    function clicked(ev)
    {
        if (isExpanded)
        {
            reduce();
        }
        else
        {
            expand();

            menubarDiv.focus();
        }
    }

    function documentClick(ev)
    {
        if (isExpanded && ev.target.className !== "menubarDiv" &&
            (ev.target.offsetParent === null || ev.target.offsetParent.className !== "menubarDiv"))
        {
            reduce();
        }
    }

    function expand()
    {
        menuIcon.style.opacity = "0.0";
        
        setTimeout(function()
        {
            //Change icon
            menuIcon.className = menuIcon.className.replace("fa-bars", "fa-times");
            menuIcon.style.opacity = "initial";
            menuIcon.style.color = "#000000";

            //Display menubar
            menubarDiv.style.width = expandSize;
            menubarDiv.style.padding = "0em 1.5em 0em 0em";

            setTimeout(function()
            {
                //TODO: Remove showChildren and hideChildren (if it works without)
                //showChildren();

                isExpanded = true;
            }, expandTime);
        }, expandTime);
    }

    function reduce()
    {
        menuIcon.style.opacity = "0.0";
        
        setTimeout(function()
        {
            //Hide menubar
            menubarDiv.style.padding = "0em 0em 0em 0em";
            menubarDiv.style.width = "0%";
            
            //hideChildren();

            //Change icon
            menuIcon.className = menuIcon.className.replace("fa-times", "fa-bars");
            menuIcon.style.opacity = "initial";
            menuIcon.style.color = "#3a5b83";

            isExpanded = false;
        }, expandTime);
    }

    function showChildren()
    {
        var children = document.querySelectorAll(".menubarDiv *");

        for (var i = 0; i < children.length; i++)
        {
            children[i].style.display = "initial";
        }
    }

    function hideChildren()
    {
        var children = document.querySelectorAll(".menubarDiv *");
        
        for (var i = 0; i < children.length; i++)
        {
            children[i].style.display = "none";
        }
    }
}