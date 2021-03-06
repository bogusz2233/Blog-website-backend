// Żeby odpalić:  node server.js -e js,hbs lub nodemon server.js -e js,hbs
const express = require('express');
const bodyParser = require("body-parser");

const homePage = require("./homePage/homePage");
const weather = require("./weather/weather");
const posts = require("./posts/posts");
const comments = require("./comments/comments");

const port = process.env.PORT || 3003;  // pobranie portu, gdy nie znajdzie wstawi 3000
var app = express();


app.use(express.static(__dirname + "/public"));
;
 
//weather get
app.get("/weather", (request, res) => {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    // response.setHeader('Content-Type', 'application/json');
    console.log("Zapytanie get: " + request.query.get)
    weather(request.query, res);
});
app.get('/HomePageData',(req, res) => {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    res.send(homePage(req.query));
});

app.use('/v1/posts', posts());

app.use("/v1/comments", comments());

app.listen(port, () =>{ // port od heroku
    console.log(`Server is up on port ${port}`);
});