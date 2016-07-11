//Required libraries 
var keys = require('./keys');
var request = require('request');
var fs = require('fs');
var twitter = require('twitter')
var spotify = require('spotify');

//Twitter keys
var client = new twitter({
  consumer_key: keys.twitterKeys.consumer_key,
  consumer_secret: keys.twitterKeys.consumer_secret,
  access_token_key: keys.twitterKeys.access_token_key,
  access_token_secret: keys.twitterKeys.access_token_secret
});

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
      for (var i = 0; i < tweets.length; i++){
        console.log('On ' + tweets[i].created_at + '\n' + '@' + tweets[i].user.screen_name + ' tweeted: ' + '\n' + '"' +tweets[i].text + '"' +'\n\n');
      }
    } else {
      console.log(error);
    }
  })
}

function spotifySong (song) {
  var song;
    if (song === "") {
      process.argv[3] = "what's my age again";
    } 
    else {
      song = song[1];
      for (var i = 2; i < song.length; i++) {
        song += " " + song[i];
    }
  }

    spotify.search({ type: 'track', query: song }, function(err, data) {
      var data = data.tracks.items[0];
        console.log("Artist: " + data.artists[0].name);
        console.log("Song: " + data.name);
        console.log("Link: " + data.preview_url);
        console.log("Album: " + data.album.name + "\n");
        var data = "Artist: " + data.artists[0].name;
    });
}

function getMovie(movie) {
  var movie;
//if user doesn't put in a movie title, display mr nobody
    if (movie === "") {
      movie = "Mr.Nobody";
      console.log(movie);
    } 
    else {
      movie = movie[1];
      for (var i = 2; i < movie.length; i++) {
        movie += " " + movie[i];
      }
    }
  //print out response  
  var url = "http://www.omdbapi.com/?t=" + movie;
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var movieDetails = JSON.parse(body);
      console.log("Title: " + movieDetails.Title);
      console.log("Year: " + movieDetails.Year);
      console.log("IMDB Rating: " + movieDetails.imdbRating);
      console.log("Country: " + movieDetails.Country);
      console.log("Language: " + movieDetails.Language);
      console.log("Plot: " + movieDetails.Plot);
      console.log("Actors: " + movieDetails.Actors);
    }
  });
}


function justDoIt () {
  fs.readFile("./random.txt", "utf8", (err, data) => {
    data = data.replace(/\n/g, ',').split(",");
      for (var i = 0; i < data.length; i += 2) {
        var sendData = [data[i], data[i+1]];
        commands(sendData);
      }
  });
}