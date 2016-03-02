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
    request = require('request'), 
    app = express(); 

var indexOf = [].indexOf || // no idea what this is
    function( item ) { 
        for ( var i = 0, l = this.length; i < l; i++ ) { 
            if ( i in this && this[ i ] === item ) 
                return i; 
        } return -1; 
    };

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

    // get the facebook group posts
    getGroups: function( accessToken ) {
        var url = "https://graph.facebook.com/me/groups?access_token=" + accessToken;
        return request( url, function( error, response, body ) {

            groups = JSON.parse( body );
            console.log( groups ); 

            if ( error ) {
                console.log( "error ", error );
                process.exit(); 
            } else if ( indexOf.call( groups, "error" ) >= 0 ) {
                console.log( "posts error ", groups.error );
                process.exit(); 
            }

            // find save mah inbox
            // for ( var i in groups )
            // if groups[ i ].name === 'Save Mah Inbox' 
            // return with id; 
            // name: 'Save Mah Inbox'
        })
    }


}

function getGroups( accessToken ) {
    var url = "https://graph.facebook.com/me/groups?access_token=" + accessToken;
}

a = new APIRequest(); 
token = 'CAACEdEose0cBABqO3wdcqkwCoffSHjQ9YgMVZBgbckZBRZAI3FoLUcc6W1mji8cX2fuGTo8l4BwkeHnwad6PVVPYGSc4S6TZBIC3ZCUcYXXjZAuTN5jxEs30ZB6KB97ZBUktp7ZBJwhTQW4q21akqbx8E9HuuQaLaKxHzSEzPuQNxkx2b1IPkXdrs9fcPU6IeP71rOxdvVlZBo2gZDZD'; 

a.getGroups( token ); 
