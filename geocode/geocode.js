const request = require('request');

var geocodeAddress = function(address, callback) {

    var Address = encodeURIComponent(address);

    request({
        url: `http://maps.googleapis.com/maps/api/geocode/json?address=${Address}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to Google servers.')
        } else if (body.status === 'ZERO_RESULTS') {
            callback('Unable to find that address.');
        } else if (body.status === "OK") {
            callback(undefined, {
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            })
        }
    });


}


module.exports.geocodeAddress = geocodeAddress;