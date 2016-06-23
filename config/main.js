// main.js
// -----------------------------------------------------------------------------
// @author Kyle Wagner
// @description The configuration settings for the application
// -----------------------------------------------------------------------------

module.exports = {
    dbFile: process.env.DATABASE_FILE || 'db.sqlite3',
    bannedListFile: process.env.BANNED_TZ_LIST || './config/bannedZones.txt',
    twitterConsumerKey: process.env.TWITTER_CONSUMER_KEY,
    twitterConsumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    twitterTokenKey: process.env.TWITTER_TOKEN_KEY,
    twitterTokenSecret: process.env.TWITTER_TOKEN_SECRET
};
