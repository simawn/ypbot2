/*
Need to add your key on line 28: Ocp-Apim-Subscription-Key
 */

//POST
var request = require('request'); //npm request handling
var uuidV1 = require('uuid/v1'); //npm for UUID generator

function extractKeywords(searchString, callback) {

    var wordArray = []; //To store extracted words

    var body = {
        'documents': [
            {
                'language': 'en',
                'id': uuidV1(),
                'text': searchString
            }
        ]
    };

    var requestOptions = {
        url: "https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/keyPhrases",
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': ''
        },
        json: true, //!!!
        body: body
    };

    request(requestOptions, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            body.documents[0].keyPhrases.forEach(function (keywords) {
                //console.log(keywords);
                wordArray.push(keywords);
            })
        } else {
            console.log(response.statusCode);
            console.log(body);
        }
        callback(wordArray.join('+')); //Transforms array into a string, delimimted with +
    });
}

module.exports = extractKeywords;