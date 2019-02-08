const Router = require("express").Router;
const postControler = require("./postsController");

var posts = () => {
    const api = Router();

    api.get("/id/:id", postControler.findOne);
    api.get("/all", postControler.getAll);
    api.get("/countAll", postControler.getPostsCount);
    return api;
}

module.exports = posts;