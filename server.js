//var http = require( 'http' ), 
//    fs = require( 'fs' ), 
//    index = fs.readFileSync( 'index.html' ); 
//
//http.createServer( function ( req, res ) {
//    res.writeHead( 200, {'Content-Type': 'text/plain'} );
//    res.end( index );
//}).listen( 8080, 'localhost' );
//console.log( 'Server running at http://localhost:8080/' );

var express = require('express'), 
    path = require('path'), 
    levelup = require( 'levelup' ), 
    _ = require('underscore'), 
    app = express(); 

// viewed at http://localhost:8080
app.get( '/', function( req, res ) {
    res.sendFile( path.join( __dirname + '/index.html' ) );
});

// listening / showing index
app.listen( 8080 );

function APIRequest() {
    this.res_data = []; 
}

APIRequest.prototype = {
    getGroups: function( accessToken ) {
        var url = "https://graph.facebook.com/me/groups?access_token=" + accessToken;
    }
}

function getGroups( accessToken ) {
    var url = "https://graph.facebook.com/me/groups?access_token=" + accessToken;
}

console.log( "...working" ); 
console.log( new APIRequest() ); 