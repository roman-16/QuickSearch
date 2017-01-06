SearchSuggestions = function(parent)
{
    var me = this;
    var searchSuggestionsDiv = document.createElement("div");
    var selectedButton;
    var currentSearchSuggestionsData;
    var inputValue;
    var backgroundColor = "#757575";
    var backgroundColorFocus = "#3a5b83";
    var fontColor = "#000000";
    var fontColorFocus = "#000000";



    this.showSearchSuggestions = function(value)
    {
        inputValue = value;

        resetSelectedButton();

        if (!value.isEmpty())
        {
            GoogleData.getSearchSuggestions(value, function(data)
            {
                if (currentSearchSuggestionsData === undefined)
                {
                    currentSearchSuggestionsData = data;
                }

                if (currentSearchSuggestionsData.executionTime <= data.executionTime && !inputValue.isEmpty())
                {
                    currentSearchSuggestionsData = data;

                    createSearchSuggestions(data.query.results.json.json[1]);
                }
            });
        }
        else
        {
            me.hideSearchSuggestions();
        }
    }

    this.hideSearchSuggestions = function(ev)
    {
        if (ev === undefined || ev.relatedTarget === null || ev.relatedTarget.className !== "searchSuggestionButton")
        {
            searchSuggestionsDiv.innerHTML = "";
        }
    }

    this.selectDownwards = function()
    {
        var searchSuggestionButtons = searchSuggestionsDiv.children;

        if (searchSuggestionButtons.length != 0)
        {
            if (selectedButton === undefined)
            {
                selectedButton = 0;
            }
            else
            {
                searchSuggestionButtons[selectedButton].style.background = backgroundColor;
                searchSuggestionButtons[selectedButton].style.color = fontColor;
                selectedButton++;

                if (selectedButton > Config.numberOfSearchSuggestions - 1 ||
                    selectedButton > searchSuggestionButtons.length - 1)
                {
                    selectedButton = undefined;

                    return inputValue;
                }
            }

            searchSuggestionButtons[selectedButton].style.background = backgroundColorFocus;
            searchSuggestionButtons[selectedButton].style.color= fontColorFocus;

            return searchSuggestionButtons[selectedButton].value;
        }
        else if (inputValue === undefined)
        {
            return "";
        }
        else
        {
            return inputValue;
        }
    }

    this.selectUpwards = function()
    {
        var searchSuggestionButtons = searchSuggestionsDiv.children;

        if (searchSuggestionButtons.length != 0)
        {
            if (selectedButton === undefined)
            {
                if (Config.numberOfSearchSuggestions - 1 < searchSuggestionButtons.length - 1)
                {
                    selectedButton = Config.numberOfSearchSuggestions - 1;
                }
                else
                {
                    selectedButton = searchSuggestionButtons.length - 1;
                }
            }
            else
            {
                searchSuggestionButtons[selectedButton].style.background = backgroundColor;
                searchSuggestionButtons[selectedButton].style.color = fontColor;
                selectedButton--;

                if (selectedButton < 0)
                {
                    selectedButton = undefined;

                    return inputValue;
                }
            }

            searchSuggestionButtons[selectedButton].style.background = backgroundColorFocus;
            searchSuggestionButtons[selectedButton].style.color = fontColorFocus;

            return searchSuggestionButtons[selectedButton].value;
        }
        else if (inputValue === undefined)
        {
            return "";
        }
        else
        {
            return inputValue;
        }
    }

    this.onMouseClick = function(state)
    {
        var event = new CustomEvent("mouseclicked", { detail: state });

        window.dispatchEvent(event);
    }

	this.setBackgroundColor = function(value)
	{
		backgroundColor = value;
	}
	
	this.setBackgroundColorFocus = function(value)
	{
		backgroundColorFocus = value;
	}

	this.setFontColor = function(value)
	{
		fontColor = value;
	}
	
	this.setFontColorFocus = function(value)
	{
		fontColorFocus = value;
	}



    init();
    function init()
    {
        searchSuggestionsDiv.className = "searchSuggestionsDiv";
        searchSuggestionsDiv.onmouseout = resetSelectedButton;

        parent.appendChild(searchSuggestionsDiv);
    }

    function selectMouseOver(ev)
    {
        var searchSuggestionButtons = searchSuggestionsDiv.children;
        
        if (selectedButton !== undefined)
        {
            searchSuggestionButtons[selectedButton].style.background = backgroundColor;
            searchSuggestionButtons[selectedButton].style.color = fontColor;
        }

        for (var i = 0; i < searchSuggestionButtons.length; i++)
        {
            if (searchSuggestionButtons[i].value == ev.target.value)
            {
                selectedButton = i;
            }
        }

        searchSuggestionButtons[selectedButton].style.background = backgroundColorFocus;
        searchSuggestionButtons[selectedButton].style.color = fontColorFocus;

        return searchSuggestionButtons[selectedButton].value;
    }

    function resetSelectedButton()
    {
        if (selectedButton !== undefined)
        {
            var searchSuggestionButtons = searchSuggestionsDiv.children;

            if (searchSuggestionButtons !== undefined && selectedButton <= searchSuggestionButtons.length - 1)
            {
                searchSuggestionButtons[selectedButton].style.background = backgroundColor;
                searchSuggestionButtons[selectedButton].style.color = fontColor;
            }

            selectedButton = undefined;
        }
    }

    function createSearchSuggestions(json)
    {
        //Check for no result
        if (json !== null)
        {
            var results = json.json;
            var maxResults = parseInt(Config.numberOfSearchSuggestions);

            searchSuggestionsDiv.innerHTML = "";

            if (results.isArray())
            {
                //Set max results
                if (maxResults > results.length)
                {
                    maxResults = results.length;
                }

                for (var i = 0; i < maxResults; i++)
                {
                    searchSuggestionsDiv.appendChild(createSearchSuggestion(results[i]));
                }
            }
            else if (results != inputValue)
            {
                searchSuggestionsDiv.appendChild(createSearchSuggestion(results));
            }
            else
            {
                searchSuggestionsDiv.innerHTML = "";
            }
        }
        else
        {
            searchSuggestionsDiv.innerHTML = "";
        }
    }

    function createSearchSuggestion(value)
    {
        var searchSuggestionButton = document.createElement("input");

        searchSuggestionButton.className = "searchSuggestionButton";
        searchSuggestionButton.type = "button";
        searchSuggestionButton.value = value;
        searchSuggestionButton.style.backgroundColor = backgroundColor;
        searchSuggestionButton.style.color = fontColor;
        searchSuggestionButton.onmouseover = selectMouseOver;
        searchSuggestionButton.onclick = me.onMouseClick;

        return searchSuggestionButton;
    }
}