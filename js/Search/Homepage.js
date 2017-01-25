Homepage = function(homepage, quickSearchHotkeyStart, quickSearch, quickSearchHotkeyEnd)
{
	var me = this;
    var linkStartsWith = ["http:", "https:", "www."];

    

    this.openHomepage = function(value)
    {
        //Open homepage
        if (arguments.length === 0)
        {
            me.openURL(homepage);
            return;
        }

        //Test for quicksearch
        if (quickSearch !== undefined)
        {
            var quickSearchHotkeys = quickSearch.getColumn(0);

            for (var i = 0; i < quickSearchHotkeys.length; i++)
            {
                quickSearchHotkeys[i] = quickSearchHotkeyStart + quickSearchHotkeys[i] + quickSearchHotkeyEnd;
            }
            
            for (var i = 0; i < quickSearchHotkeys.length; i++)
            {
                if (value.startsWith(quickSearchHotkeys[i]))
                {
                    me.openURL(quickSearch[i][1] + value.replace(quickSearchHotkeys[i], ""));
                    return;
                }
            }
        }
        
        //Test for link
        if (value.startsWithAny(linkStartsWith))
        {
            me.openURL(value);
            return;
        }
        
        //Normal search
        me.openURL(homepage + value);
    }

    this.openURL = function(value)
    {
        value = encodeURI(value);

        if (value.startsWith("www."))
        {
            window.open("http://" + value, "_self");
        }
        else
        {
            window.open(value, "_self");
        }
    }

    this.setLinkStartsWith = function(value)
    {
        linkStartsWith = value;
    }
}
