
const mysql      = require('mysql');
const hostInfo = () =>{
    try{
        return require("./hostInfo");
    }catch(err)
    {
        return {
            "HOST_NAME": process.env.DATA_BASE_HOST_NAME,
            "USER_NAME": process.env.DATA_BASE_LOGIN,
            "PASSWORD": process.env.DATA_BASE_PASSWORD,
            "DATA_BASE": process.env.DATA_BASE_NAME
        };
    }
}

var connection = mysql.createConnection({
    connectionLimit: 50,
    host     : hostInfo().HOST_NAME,
    user     : hostInfo().USER_NAME,
    password : hostInfo().PASSWORD,
    database : hostInfo().DATA_BASE 
    });


var findOne =  (req,res) => {

        const queryString = "SELECT * FROM posts WHERE id = ?";
        const postId = req.params.id;
        connection.query(queryString, [postId],(err, rows, fields) =>{
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
 
const getAll = (req,res) => {

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
    findOne,
    getAll,
    getPostsCount
};