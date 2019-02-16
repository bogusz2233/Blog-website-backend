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

module.exports = 
{
    getHostInfo,
    createNewMySqlConnection,
};

// var connection = createNewMySqlConnection();