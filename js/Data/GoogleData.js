var GoogleData = new function()
{
    this.getSearchSuggestions = function(value, callback)
    {
        var id = "i" + Math.random().toString(36).slice(2);
        var executionTime = window.performance.now();

        this.getSearchSuggestions[id] = function(data)
        {
            data.executionTime = executionTime;

            callback(data);

            delete GoogleData.getSearchSuggestions[id];
            document.getElementById("searchSuggestionsQuery" + id).remove();
        };

        var s = document.createElement("script");

        s.src = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url%3D%22http%3A%2F%2Fsuggestqueries.google.com%2Fcomplete%2Fsearch%3Fclient%3Dfirefox%26q%3D" +
                encodeURIComponent(encodeURIComponent(value)) +
                "%22%20&format=json&callback=GoogleData.getSearchSuggestions." + id;
        s.id = "searchSuggestionsQuery" + id;

        document.getElementsByTagName("*")[1].appendChild(s);
    }
}
