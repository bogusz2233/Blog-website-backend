const Router = require("express").Router;
const postControler = require("./postsController");

var posts = () => {
    const api = Router();

    api.get("/", postControler.getAll);
    api.get("/:id", postControler.findOne);
    api.get("/:id/:property", postControler.findOneColumn)
    api.get("/countAll", postControler.getPostsCount);
    
    return api;
}

module.exports = posts;