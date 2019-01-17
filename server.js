// Żeby odpalić:  node server.js -e js,hbs lub nodemon server.js -e js,hbs
const express = require('express');
const homePage = require("./homePage/homePage");

const port = process.env.PORT || 3000;  // pobranie portu, gdy nie znajdzie wstawi 3000
var app = express();

app.use(express.static(__dirname + "/public"));
app.get('/HomePageData',(req, res) => {
    res.send(homePage(req.query));
});

app.listen(port, () =>{ // port od heroku
    console.log(`Server is up on port ${port}`);
});