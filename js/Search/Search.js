Search = function(parent, homepage, quickSearchHotkeyStart, quickSearch, quickSearchHotkeyEnd)
{
	var me = this;
	var searchDiv = document.createElement("div");
	var searchInputDiv = document.createElement("div");
	var searchInput = document.createElement("input");
	var searchSuggestionsDiv = document.createElement("div");
	var searchSuggestions;
	var useSearchSuggestions = true;
	var backgroundColor = "#363636";
	var backgroundColorFocus = "#525252";
	var borderColor = "#3a5b83";
	var borderColorFocus = "#525252";
	var fontColor = "#3a5b83";
	var fontColorFocus = "#000000";

	if (arguments.length > 4)
	{
		Homepage.apply(this, [homepage, quickSearchHotkeyStart, quickSearch, quickSearchHotkeyEnd]);
	}
	else
	{
		Homepage.apply(this, [homepage]);
	}



	this.focus = function()
	{
		searchInput.focus();
	}

	this.getSearchSuggestions = function()
	{
		return searchSuggestions;
	}

	this.setUseSearchSuggestions = function(value)
	{
		useSearchSuggestions = value;
	}

	this.setBackgroundColor = function(value)
	{
		backgroundColor = value;
	}
	
	this.setBackgroundColorFocus = function(value)
	{
		backgroundColorFocus = value;
	}

	this.setBorderColor = function(value)
	{
		borderColor = value;
	}
	
	this.setBorderColorFocus = function(value)
	{
		borderColorFocus = value;
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
		searchSuggestions = new SearchSuggestions(searchSuggestionsDiv);
		searchSuggestions.onMouseClick = searchSuggestionClicked;
		
		searchDiv.className = "searchDiv";
		searchInputDiv.className = "searchInputDiv";
		searchInput.className = "searchInput";
		searchInput.type = "text";
		searchInput.autocomplete = "off";
		searchInput.autofocus = true;
		searchInput.onkeyup = keyPressed;
		searchInput.onfocus = focused;
		searchInput.onblur = blured;
		searchSuggestionsDiv.className = "searchSuggestionsParentDiv";

		searchDiv.appendChild(searchInputDiv);
		searchInputDiv.appendChild(searchInput);
		searchDiv.appendChild(searchSuggestionsDiv);
		parent.appendChild(searchDiv);
	}
	
	function keyPressed(ev)
	{
		var value = searchInput.value;

		if (ev.keyCode == 13)
		{
			me.openHomepage(value.trim());
		}
		else if (ev.keyCode == 34 || ev.keyCode == 40)
		{
			//Select lower search suggestion
			value = keepQuickSearchHotkey(value) + searchSuggestions.selectDownwards();
		}
		else if (ev.keyCode == 33 || ev.keyCode == 38)
		{
			//Select upper search suggestion
			value = keepQuickSearchHotkey(value) + searchSuggestions.selectUpwards();
		}
		else if (ev.keyCode == 27)
		{
			//Hide search suggestion on escape
			searchSuggestions.hideSearchSuggestions();
		}
		else if (useSearchSuggestions)
		{
			searchSuggestions.showSearchSuggestions(removeQuickSearchHotkey(value));
		}
		
		//TODO: Key up, set cursor to last position (rework feature like google)
		searchInput.focus();
		searchInput.value = value;
	}

	function focused(ev)
	{
		searchInput.style.backgroundColor = backgroundColorFocus;
		searchInput.style.borderColor = borderColorFocus;
		searchInput.style.color = fontColorFocus;
	}

	function blured(ev)
	{
		searchInput.style.backgroundColor = backgroundColor;
		searchInput.style.borderColor = borderColor;
		searchInput.style.color = fontColor;

		searchSuggestions.hideSearchSuggestions(ev);
	}

	function searchSuggestionClicked(ev)
	{
        searchInput.value = keepQuickSearchHotkey(searchInput.value) + ev.target.value;
        searchInput.focus();

		searchSuggestions.showSearchSuggestions(removeQuickSearchHotkey(searchInput.value));
	}

	function removeQuickSearchHotkey(value)
	{
		if (quickSearch === undefined)
		{
			return value;
		}

		var quickSearchHotkeys = quickSearch.getColumn(0);

		for (var i = 0; i < quickSearchHotkeys.length; i++)
		{
			quickSearchHotkeys[i] = quickSearchHotkeyStart + quickSearchHotkeys[i] + quickSearchHotkeyEnd;
		}
		
		for (var i = 0; i < quickSearchHotkeys.length; i++)
		{
			if (value.startsWith(quickSearchHotkeys[i]))
			{
				return value.replace(quickSearchHotkeys[i], "");
			}
		}

		return value;
	}

	function keepQuickSearchHotkey(value)
	{
		if (quickSearch === undefined)
		{
			return value;
		}

		var quickSearchHotkeys = quickSearch.getColumn(0);

		for (var i = 0; i < quickSearchHotkeys.length; i++)
		{
			quickSearchHotkeys[i] = quickSearchHotkeyStart + quickSearchHotkeys[i] + quickSearchHotkeyEnd;
		}
		
		for (var i = 0; i < quickSearchHotkeys.length; i++)
		{
			if (value.startsWith(quickSearchHotkeys[i]))
			{
				return quickSearchHotkeys[i];
			}
		}

		return "";
	}
}