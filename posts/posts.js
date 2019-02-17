const Router = require("express").Router;
const postControler = require("./postsController");

var posts = () => {
    const api = Router();

    api.get("/", postControler.getAll);
    api.get("/count", postControler.getPostsCount);
    api.get("/:id", postControler.findOne);
    api.get("/:id/:property", postControler.findOneColumn);
    
    return api;
}

module.exports = posts;