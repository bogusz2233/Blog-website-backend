const database = require("../database/database");
const {createNewMySqlConnection} = require("../database/database");

var connection = createNewMySqlConnection();

const createOne = async (request, response)  =>{
    let bodyReq = request.body;
    //Gdy nie podano żadnych infomacji
    if(Object.entries(bodyReq).length === 0 ) return response.status(400).send({"errorMessage": "Didn't pass data in body"});
    
    let {userName, message, idPost} = request.body;
    let dateObj = new Date();
    
    let currentYear = dateObj.getFullYear();
    let currentMonth = dateObj.getMonth() + 1; //January is 0!;
    let currentDay = dateObj.getDate();
    let currentHour = dateObj.getHours();
    let currentMinute = dateObj.getMinutes();
    let currentSecond = dateObj.getSeconds();

    let dateFormated = `${currentYear}-${currentMonth}-${currentDay} ${currentHour}-${currentMinute}-${currentSecond}`;
    console.log(dateFormated);

    const queryString = "INSERT INTO comments SET ?";
    await connection.query(queryString, {idPost: idPost, user_name: userName, message: message, time_added:dateFormated }, (error, results, fields) => {
        if (error) throw error;
        console.log(results.insertId);
      });
    return response.sendStatus(201);
}

module.exports = {
    createOne
};