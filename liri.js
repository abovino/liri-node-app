//Required libraries 
var keys = require('./keys');
var request = require('request');
var fs = require('fs');
var twitter = require('twitter')
/*var spotify = require('spotify');*/

//Twitter keys
var client = new twitter({
  consumer_key: keys.twitterKeys.consumer_key,
  consumer_secret: keys.twitterKeys.consumer_secret,
  access_token_key: keys.twitterKeys.access_token_key,
  access_token_secret: keys.twitterKeys.access_token_secret
});

console.log(client);

//Accept terminal arguments
parseCommand(process.argv[2],process.argv.splice(3, process.argv.length-1).join(' '));

function parseCommand(command, request){
  switch(command){
    case 'my-tweets':
      tweets();
      return;
    case 'spotify-this-song':
      spotifySong(request);
      return;
    case 'movie-this':
      getMovie(request);
      return;
    case 'do-what-it-says':
      doThis();
      return;
  }
}

//Retrieve last 20 tweets
function tweets(){
  var params = {screen_name: 'angelo_bov'};
  client.get('statuses/user_timeline', params, function(error, tweets, response){
    if (!error) {
      for (var i = 0; i < 21; i++){
        console.log(tweets[i]);
      }
    } else {
      console.log(error);
    }
  })
}

