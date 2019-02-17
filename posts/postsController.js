
const {createNewMySqlConnection} = require("../database/database");

var connection = createNewMySqlConnection();

const findOne = async (req,res) => {
    res.header("Access-Control-Allow-Origin", '*');
    res.header('Access-Control-Allow-Methods', 'GET');
    const queryString = "SELECT * FROM posts WHERE id = ?";
    const postId = req.params.id;

    await connection.query(queryString, [postId],(err, rows, fields) =>{
        if(err)
        {
            res.sendStatus(500);
        }
        else
        {
            if(rows.length > 0)
            {
                res.json(rows[0]);
            }
            else
            {
                res.sendStatus(404);
            }
        }
        return;
    });
};

const findOneColumn = async (req,res) => {
    res.header("Access-Control-Allow-Origin", '*');
    res.header('Access-Control-Allow-Methods', 'GET');

    const queryString = "SELECT ? FROM posts WHERE id = ?";
    const postId = req.params.id;
    const postProp = req.params.property;
    console.log(postId, postProp);
    await connection.query(queryString, [postProp], (err, rows, fields) =>{
        if(err)
        {
            
            res.sendStatus(500);
        }
        else
        {
            if(rows.length > 0)
            {
                console.log(rows);
                console.log(fields);
                res.json(rows[0]);
            }
            else
            {
                res.sendStatus(404);
            }
        }
});
};

const getAll = (req,res) => {
    res.header("Access-Control-Allow-Origin", '*');
    res.header('Access-Control-Allow-Methods', 'GET');

    const queryString = "SELECT * FROM posts";
    connection.query(queryString, (err, rows, fields) =>{
        if(err)
        {
            
            res.sendStatus(500);
        }
        else
        {
            if(rows.length > 0)
            {
                res.json(rows);
            }
            else
            {
                res.sendStatus(404);
            }
        }
    });
};

const getPostsCount = (req,res) => {

    res.header("Access-Control-Allow-Origin", '*');
    res.header('Access-Control-Allow-Methods', 'GET');
    const queryString = "SELECT COUNT(id) as COUNT FROM posts";
    connection.query(queryString, (err, rows, fields) =>{
        if(err)
        {
            
            res.sendStatus(500);
        }
        else
        {
            if(rows.length > 0)
            {
                res.json(rows[0]);
            }
            else
            {
                res.sendStatus(404);
            }
        }
    });
};

module.exports = 
{
    getPostsCount,
    findOne,
    findOneColumn,
    getAll,
};