class GoogleData
{
    public static getSearchSuggestions(value: string, callback: any): void
    {
        let id: string = "i" + Math.random().toString(36).slice(2);
        let executionTime: number = window.performance.now();

        (<any>GoogleData.getSearchSuggestions)[id] = function (data: any)
        {
            data.executionTime = executionTime;
            
            callback(data);

            delete (<any>GoogleData.getSearchSuggestions)[id];
            let script: HTMLElement | null = document.getElementById("searchSuggestionsQuery" + id);

            if (script !== null)
                script.remove();
        };

        let s: HTMLScriptElement = document.createElement("script");

        s.src = "https://suggestqueries.google.com/complete/search?client=chrome&q=" + encodeURIComponent(value) + "&callback=GoogleData.getSearchSuggestions." + id;
        s.id = "searchSuggestionsQuery" + id;

        document.getElementsByTagName("*")[1].appendChild(s);
    }
}
