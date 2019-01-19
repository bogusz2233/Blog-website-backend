const assert = require("assert");
const geocode = require("./geocode")
const GEOCODE_CHECK_ADRESS = "bogusze stare 26"

it("Check if status connection is ok", () => {
    var geocodeJson = geocode.getGeocodeParam(GEOCODE_CHECK_ADRESS);
    
    assert.equal(geocodeJson.status,"OK", `Nie otrzymano zwrotu z bazy danych`);
});

it("Check if restult formatted_address exist", () =>{
    var geocodeJson = geocode.getGeocodeParam(GEOCODE_CHECK_ADRESS);
    
    assert.notEqual( typeof geocodeJson.results[0].formatted_address, undefined, "Nie otrzymalismy zformatowanego adressu");
});

it("Check if restult geometry exist", () =>{
    var geocodeJson = geocode.getGeocodeParam(GEOCODE_CHECK_ADRESS);

    assert.notEqual( typeof geocodeJson.results[0].geometry, undefined, "Nie otrzymalismy wspolrzednych geometrycznych");
});

