const fs = require('fs');
/*
 Main function function for query content for Home page
 askingQuery - query send from user
*/
var askForContent = (askingQuery) =>{
    let odpowiedz ={
        messageError : "ALL_OK"
    };

    if(askingQuery.askForNumber === "true")
    {
        odpowiedz.contentNumber = loadJSONFromFile("homePage/content.json", odpowiedz).content.length;
        return odpowiedz;
    } else if(askingQuery.contentNumber === undefined)
    {
        odpowiedz.messageError = "PARAM_MISSED";
        return odpowiedz;
    }
   

    odpowiedz.body = loadJSONFromFile("homePage/content.json",askingQuery.contentNumber, odpowiedz.messageError);
    odpowiedz.body.desc = loadStringFromTxtFile(odpowiedz.body.descSrc);
    return odpowiedz;
    
};

/*
function to load JSON from file
argPathFile - relative path to JSON file
contentNumber - number of content asking for
contentNumber - 
*/
var loadJSONFromFile = (argPathFile, contentNumber, errorMessageCallback) =>{
    let obj;
    try{
        obj = JSON.parse(fs.readFileSync(argPathFile, 'utf8'));
        if(obj.content.length <= contentNumber)
        {
            errorMessageCallback = "No_SUCH_CONTENT";
        }
        else
        {
            return obj.content[contentNumber];
        }
    }catch(err)
    {
        errorMessageCallback = "NO_JSON_CONTENT";
    }
   
    return obj =""
};

var loadStringFromTxtFile = (argPathFile) =>{
    let obj;
    try{
        return fs.readFileSync("homePage/desc/" + argPathFile, 'utf8');
    }catch
    {
        return "Not desc found"
    }
}

module.exports = askForContent;