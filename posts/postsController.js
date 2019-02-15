
const mysql = require('mysql');

const getHostInfo = () =>{
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


const createNewMySqlConnection = () =>{
    return mysql.createConnection({
        connectionLimit: 50,
        host     : getHostInfo().HOST_NAME,
        user     : getHostInfo().USER_NAME,
        password : getHostInfo().PASSWORD,
        database : getHostInfo().DATA_BASE 
        });
}
var connection = createNewMySqlConnection();

var getgetHostInfo = () =>{
    return getHostInfo();
}
var findOne = async (req,res) => {
      
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
    });
};

var findOneColumn = async (req,res) => {
      
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
    findOneColumn,
    getAll,
    getPostsCount,
    getHostInfo,
    createNewMySqlConnection,
};