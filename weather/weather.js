const axios = require('axios');
const IP_KEY_GEOCODE = "AIzaSyDgFQItK2bPF6UqPjZt6YBh-fc77OJJ82Y";
const IP_KEY_DARKSKY = "ff392353fef24409879e40c8262de7a8";

/*
    Function return actual weather
    argQuery - arguments passed in querry
    responseCallback - reference to response object, use here to send back response
*/
var queryWheter = (argQuery, responseCallback) => {
    var jsonResponse;   //response json
    var encodedGeocodeArgs = encodeURIComponent(argQuery.place);
    var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedGeocodeArgs}&key=${IP_KEY_GEOCODE}`;

    // if place argument was't pass
    if(argQuery.place ==undefined)
    {
        jsonResponse= {
            errorMessage: "NO_PLACE_PARAM_PASSED"
        };
        
        responseCallback.send(JSON.stringify(jsonResponse));
        return 0;
    }
    //send geocode request  
    axios.get(geocodeUrl).then((response) => {
        if (response.data.status === 'ZERO_RESULTS') {
            throw new Error("Unable to find that address");
        } else {
            jsonResponse = {
                lat: response.data.results[0].geometry.location.lat,
                lng: response.data.results[0].geometry.location.lng,
                formatted_address: response.data.results[0].formatted_address
            }

            //send darksky request  
            var weatherUrl = `https://api.darksky.net/forecast/${IP_KEY_DARKSKY}/${jsonResponse.lat},${jsonResponse.lng}`;
            console.log(weatherUrl);
            return axios.get(weatherUrl);
        }

    }).then((weatherResponse) => {
        if(argQuery.get == "currently")
        {
            jsonResponse.currently = weatherResponse.data.currently;
        }else if(argQuery.get == "hourly")
        {
            jsonResponse.hourly = weatherResponse.data.hourly.data;
        }else if(argQuery.get == "daily")
        {
            jsonResponse.daily = weatherResponse.data.daily.data;
        }
        else
        {
            jsonResponse.errorMessage = "NO_GET_PARAM_PASSED";
        }
        responseCallback.send(JSON.stringify(jsonResponse));
    }).catch((err) => {
        if (err.code === 'ENOTFOUND') {
            jsonResponse.errorMessage = "UNABLE_TO_CONNECT_URL";
            
        } else {
            jsonResponse.errorMessage = err.message;
        }
        responseCallback.send(JSON.stringify(jsonResponse));
    });
};

module.exports = queryWheter;