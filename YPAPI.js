/*
Need to add your key on line 13: apikey
 */
//GET
var request = require('request');
var uuidV1 = require('uuid/v1');

function yellowPage(keywords, location, callback) {
    var stores = []; //To store results
    var totalListings;

    var YPAPIOptions = {
        apikey: '',
        UUID: uuidV1(),
        distance: 1,
        pgLen: 40,
        pg: 1
    };

    var requestOptions = {
        url: "http://api.sandbox.yellowapi.com/FindBusiness/?what=" + keywords +
        "&where=" + location +
        "&pgLen=" + YPAPIOptions.pgLen +
        "&pg=" + YPAPIOptions.pg +
        "&&dist=" + YPAPIOptions.distance +
        "&fmt=JSON&lang=en&UID=" + YPAPIOptions.UUID +
        "&apikey=" + YPAPIOptions.apikey,
        method: 'GET'
    };

    request(requestOptions, function(err, response, body){
        bodyJSON = JSON.parse(body); //YP returns a string, parse it so it is a JSON

        bodyJSON.listings.forEach(function(results){
            stores.push(results.name); //Insert store names into array (Only the first 10)
        });

        totalListings = bodyJSON.summary.totalListings;
        //console.log(totalListings);
        //console.log(stores);

        callback(totalListings, stores);
    });

}

module.exports = yellowPage;