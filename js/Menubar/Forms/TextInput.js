TextInput = function(name, defaultValue)
{
    var me = this;
    var textInputDiv = document.createElement("div");
    var textInputP = document.createElement("p");
    var textInput = document.createElement("input");



    this.getElement = function()
    {
        textInputDiv.appendChild(textInputP);
        textInputDiv.appendChild(textInput);
        
        return textInputDiv;
    }



    init();
    function init()
    {
        textInputDiv.className = "textInputDiv";
        textInputDiv.style.width = "100%";
        textInputP.className = "textInputP";
        textInputP.innerHTML = name;
        textInputP.style.margin = "0px 10px 0px 0px";
        textInput.className = "textInput";
        textInput.type = "text";
        textInput.style.width = "40%";

        if (defaultValue !== undefined)
        {
            textInput.value = defaultValue;
        }
    }
}