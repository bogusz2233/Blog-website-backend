const Router = require("express").Router;
const bodyParser = require("body-parser");

const commentsContr = require("./commentsController");

const comments = () =>{
    const api = Router();
     // parse application/x-www-form-urlencoded
    let bodyParserMid  = bodyParser.urlencoded({ extended: false });
    //insert new value:
    api.post("/",bodyParserMid, commentsContr.createOne); 
    
    return api;
}

module.exports = comments;