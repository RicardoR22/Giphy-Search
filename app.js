var express = require('express');
var app = express();
var exphbs = require('express-handlebars');
var http = require('http');
var giphy = require('giphy-api')();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static('public'));

app.get('/', function(req, res){
    if (req.query.term) {
        giphy.search(req.query.term, function(err, response){
            res.render('home', {gifs: response.data, term: req.query.term});
        });
    } else {
        giphy.trending(function(err, response){
            res.render('home', {gifs: response.data});
        });
    }

});
// app.get('/', function(req, res){
//     console.log(req.query.term);
//     var queryString = req.query.term;
//     // Encode the query string to remove white spaces and restricted characters
//     var term = encodeURIComponent(queryString);
//     // Put search term into the giphy api search url
//     var url = 'http://api.giphy.com/v1/gifs/search?q=' + term + '&api_key=dc6zaTOxFJmzC';
//
//     http.get(url, function(response) {
//         // Set encoding of response to utf8
//         response.setEncoding('utf8');
//
//         var body = '';
//
//         response.on('data', function(d){
//             // continuously update stream with data from Giphy
//             body += d
//         });
//
//         response.on('end', function(){
//             // when data is fully received parse into json
//             var parsed = JSON.parse(body);
//             // render the home template and pass the gif data in to the template
//             res.render('home', {gifs: parsed.data});
//         });
//     });
// });

app.get('./hello-gif', function(req, res) {
    var gifUrl = 'http://media2.giphy.com/media/gYBVM1igrlzH2/giphy.gif';
    res.render('hello-gif', {gifUrl: gifUrl});
});

app.get('./greetings/:name', function(req, res) {
    var name = req.params.name;
    res.render('greetings', {name: name});
});

app.listen(3000, function() {
    console.log('Gif Search listening on port localhost:3000!');
});
