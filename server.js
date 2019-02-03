// Żeby odpalić:  node server.js -e js,hbs lub nodemon server.js -e js,hbs
const express = require('express');
const homePage = require("./homePage/homePage");
const weather = require("./weather/weather");

const port = process.env.PORT || 3003;  // pobranie portu, gdy nie znajdzie wstawi 3000
var app = express();

app.use(express.static(__dirname + "/public"));

//homePage get:
app.get('/HomePageData',(req, res) => {
    res.set("Access-Control-Allow-Origin","*");
    res.send(homePage(req.query));
});

//weather get
app.get("/weather", (request, response) => {
    response.setHeader("Access-Control-Allow-Origin","*");
    response.setHeader('Content-Type', 'application/json');
    console.log("Zapytanie get: " + request.query.get)
    weather(request.query, response);
});

app.listen(port, () =>{ // port od heroku
    console.log(`Server is up on port ${port}`);
});