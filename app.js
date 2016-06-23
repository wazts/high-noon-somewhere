// app.js
// -----------------------------------------------------------------------------
// @author Kyle Wagner
// @description A twitter bot that spews out when it's high noon in a timezone
// -----------------------------------------------------------------------------

// Requires
var config = require('./config/main');
var moment = require('moment-timezone');
var log = require('./lib/logger');
var Twitter = require('twitter');

var fs = require('fs');


// --- Get the banned list
var banned = fs.readFileSync(config.bannedListFile, {encoding: 'utf8'}).split('\n');
// --- Get all timezones
var availableTZ = [];
moment.tz.names().forEach(function (tz) {
    var time = moment.tz(tz).format('HH:mm');

    // Where is it high noon?
    if (time === '12:00'){
        if (banned.indexOf(tz) == -1) {
            availableTZ.push(tz);
        }
    }
});

// --- Get timezones and send to twitter if High Noon
if (availableTZ.length > 0) {
    // Random TZ
    var randomTZ = availableTZ[Math.floor(Math.random()*availableTZ.length)];
    randomTZ = randomTZ.replace('_', ' ');
    // Send to Twitter
    var message = randomTZ + ': It\'s high noon.';

    var client = new Twitter({
        consumer_key: config.twitterConsumerKey,
        consumer_secret: config.twitterConsumerSecret,
        access_token_key: config.twitterTokenKey,
        access_token_secret: config.twitterTokenSecret
    });

    client.post('statuses/update', {status: message},  function(error, tweet, response){
        if(error) {
            log.error(error);
            return;
        }
        log.info('Tweet successful: \'' + message + '\'');
    });


} else {
    log.info('No timezones are in high noon.');
}
