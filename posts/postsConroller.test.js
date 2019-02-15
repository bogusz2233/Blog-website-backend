const postsCon = require("./postsController");
const assert = require('assert');


it("Was host info passed?",()=>{
    let hostInfo = postsCon.getHostInfo() ||{};

    assert.notEqual(hostInfo.HOST_NAME, undefined, "Host name undefined, check it");
    assert.notEqual(hostInfo.DATA_BASE, undefined, "Database name undefined, check it");
    assert.notEqual(hostInfo.PASSWORD, undefined, "Password to database undefined, check it");
    assert.notEqual(hostInfo.USER_NAME, undefined, "user name undefined, check it");
});


it("Can connect to database host?", async () => {
   
    let message  = await checkMySqlConnection().then((succes) =>{
        return succes;
    })
    .catch((error) =>{
        return error;
    });
    
    assert.equal(message, "ok", `Can't connect with database \nError code: ${message} \nPlease, check configuration!`);
});


const checkMySqlConnection = async() =>{
    return new Promise((resolve, reject)=>{
        let connection = postsCon.createNewMySqlConnection();
        connection.ping((err) =>{
            if(!err)
            {
                resolve("ok");
            }
            else
            {
                reject(err.code);
            }  
        });
    })
}

it("Is in database any records? ", async () =>{
    let  aswerCount = await queryDataBase("SELECT COUNT(id) as count FROM posts").then((succes) =>{
        return succes;
    })
    .catch((error) =>{
        return error;
    });

    if(!aswerCount.count)
    {
       assert.fail(`Can't ask database for records!\n    Error code: ${aswerCount}`);
    }
    else if(aswerCount == 0)
    {
        assert.fail("No records in database");
    }
});

const queryDataBase = (argQuerrySent) =>{
    return new Promise((resolve, reject) =>{
        let connection = postsCon.createNewMySqlConnection();
        connection.query(argQuerrySent,(error, results, fields) =>{
            if(!error)
            {
                resolve(results[0]);
            }
            else
            {
                return reject(error.sqlMessage);
            } 
        });
    });
};