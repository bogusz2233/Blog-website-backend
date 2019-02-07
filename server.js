// Żeby odpalić:  node server.js -e js,hbs lub nodemon server.js -e js,hbs
const express = require('express');
const homePage = require("./homePage/homePage");
const weather = require("./weather/weather");
const aws = require('aws-sdk');
var mysql      = require('mysql');

const port = process.env.PORT || 3003;  // pobranie portu, gdy nie znajdzie wstawi 3000
var app = express();


app.use(express.static(__dirname + "/public"));

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", '*');
//     res.header("Access-Control-Allow-Credentials", true);
//     res.header('Access-Control-Allow-Methods', 'GET');
//     res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
//     next();
// });
//homePage get:
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

app.get("/databaseTest", (req, res) => {
    var connection = mysql.createConnection({
        connectionLimit: 50,
        host     : "bogusz2.vot.pl",
        user     : process.env.DATA_BASE_LOGIN,
        password : process.env.DATA_BASE_PASSWORD,
        database: "bogusz2_blog-site"
        });
    
        connection.connect(function(err) {
            if (err) {
                res.send('error connecting: ' + err.stack);
              return;
            }
            res.send('connected as id ' + connection.threadId);
          });
});

app.listen(port, () =>{ // port od heroku
    console.log(`Server is up on port ${port}`);
});