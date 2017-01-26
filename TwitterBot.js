/*
Need to add your Twitter key and token
 */
var Twit = require('twit');
var keyPhrases = require('./KeyPhrases');
var YPAPI = require('./YPAPI');

var T = new Twit({
    consumer_key: '',
    consumer_secret: '',
    access_token: '',
    access_token_secret: ''
});

//Setup stream
var hashtag = '#ypbot2';
var stream = T.stream('statuses/filter', { track: hashtag});

//regex to eliminate all @mentions and #hashtags
const regex = /(#\S+ *|@\S+ *)/g;

//Start stream
stream.on('tweet', function(tweet){
    console.log('@' + tweet.user.screen_name);

    var screenName = tweet.user.screen_name;
    var originalTweet = tweet.text;

    var location = 'Montreal'; //default;

    //Extract keywords
    keyPhrases(originalTweet.replace(regex,''), function(extracted){
        console.log(extracted);
        YPAPI(extracted, location, function(total, stores){
            var stringToTweet = '@' + screenName + ', I have found ' + total + ' results for your query: ' + extracted;

            var textToTweet = {
                status: stringToTweet
            };

            toTweet(textToTweet);
        })
    });
    console.log(tweet.text);

});

function toTweet(textToTweet){
    T.post('statuses/update', textToTweet, function(err, data, response){
        if (err){
            console.log('Something went wrong while tweeting');
        } else {
            console.log('Reply successful!');
        }
    })
}
