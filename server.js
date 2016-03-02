//var http = require( 'http' ), 
//    fs = require( 'fs' ), 
//    index = fs.readFileSync( 'index.html' ); 
//
//http.createServer( function ( req, res ) {
//    res.writeHead( 200, {'Content-Type': 'text/plain'} );
//    res.end( index );
//}).listen( 8080, 'localhost' );
//console.log( 'Server running at http://localhost:8080/' );

var express = require('express');
var app = express();
var path = require('path');

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(8080);