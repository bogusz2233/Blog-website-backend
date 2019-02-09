const axios = require('axios');
const IP_KEY_GEOCODE = "AIzaSyDgFQItK2bPF6UqPjZt6YBh-fc77OJJ82Y";
const IP_KEY_DARKSKY = "ff392353fef24409879e40c8262de7a8";

/*
    Function return actual weather
    argQuery - arguments passed in querry
    responseCallback - reference to response object, use here to send back response
*/
var queryWheter = (argQuery, responseCallback) => {
    var jsonResponse = {
        messageError : "ALL_OK"
    };   //response json
    var encodedGeocodeArgs = encodeURIComponent(argQuery.place);
    var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedGeocodeArgs}&key=${IP_KEY_GEOCODE}`;

    // if place argument was't pass
    if(argQuery.place ==undefined)
    {
        jsonResponse= {
            messageError: "NO_PLACE_PARAM_PASSED"
        };
        
        responseCallback.json(jsonResponse);
        return 0;
    }
    //send geocode request  
    axios.get(geocodeUrl).then((response) => {
        if (response.data.status === 'ZERO_RESULTS') {
            throw new Error("Unable to find that address");
        } else {
            jsonResponse.body = {
                lat: response.data.results[0].geometry.location.lat,
                lng: response.data.results[0].geometry.location.lng,
                formatted_address: response.data.results[0].formatted_address
            }

            //send darksky request  
            var weatherUrl = `https://api.darksky.net/forecast/${IP_KEY_DARKSKY}/${jsonResponse.body.lat},${jsonResponse.body.lng}`;
            console.log(weatherUrl);
            return axios.get(weatherUrl);
        }

    }).then((weatherResponse) => {
        if(argQuery.get == "currently")
        {
            jsonResponse.body.currently = weatherResponse.data.currently;
        }else if(argQuery.get == "hourly")
        {
            jsonResponse.body = weatherResponse.data.hourly.data;
        }else if(argQuery.get == "daily")
        {
            jsonResponse.body = weatherResponse.data.daily.data;
        }
        else
        {
            jsonResponse.messageError = "NO_GET_PARAM_PASSED";
        }
        responseCallback.json(jsonResponse);
        return 0;
    }).catch((err) => {
        if (err.code === 'ENOTFOUND') {
            jsonResponse.errorMessage = "UNABLE_TO_CONNECT_URL";
            
        } else {
            jsonResponse.errorMessage = err.message;
        }
        responseCallback.json(jsonResponse);
        return 0;
    });
};

module.exports = queryWheter;