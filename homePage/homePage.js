const fs = require('fs');
/*
 Main function function for query content for Home page
 askingQuery - query send from user
*/
var askForContent = (askingQuery) =>{
    let answerReturn ={
        messageError : "ALL_OK"
    };

    if(askingQuery.askForNumber == "true")
    {
        answerReturn.contentNumber = countContentFromJSONFile("homePage/content.json", answerReturn).content.length;
        return answerReturn;
    } else if(askingQuery.contentNumber === undefined)
    {
        answerReturn.messageError = "PARAM_MISSED";
        return answerReturn;
    }
   

    answerReturn.body = loadJSONFromFile("homePage/content.json",askingQuery.contentNumber, answerReturn);
    answerReturn.body.desc = loadStringFromTxtFile(answerReturn.body.descSrc);

    return answerReturn;
};

/*
function to load JSON from file
argPathFile - relative path to JSON file
contentNumber - number of content asking for
contentNumber - 
*/
var loadJSONFromFile = (argPathFile, contentNumber, argAnswer) =>{
    let obj;
    try{
        obj = JSON.parse(fs.readFileSync(argPathFile, 'utf8'));
        
        if(obj.content[contentNumber] == undefined)
        {
            argAnswer.messageError = "WRONG_CONTENT_NUMBER";
        }
        else
        {
            return obj.content[contentNumber];
        }
    }catch(err)
    {
        argAnswer.messageError = "NO_JSON_CONTENT";
    }
   
    return obj =""
};

var countContentFromJSONFile = (argPathFile, argAnswer) =>{
    let obj;
    try{
        obj = JSON.parse(fs.readFileSync(argPathFile, 'utf8'));
        return obj;
    }catch(err)
    {
        argAnswer.messageError = "NO_JSON_CONTENT";
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