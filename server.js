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

var indexOf = [].indexOf || function( item ) { 
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
