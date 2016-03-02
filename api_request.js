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


function APIRequest() {
    this.res_data = []; 
    this.group_id = ""; 
    this.accessToken = 'CAACEdEose0cBABqO3wdcqkwCoffSHjQ9YgMVZBgbckZBRZAI3FoLUcc6W1mji8cX2fuGTo8l4BwkeHnwad6PVVPYGSc4S6TZBIC3ZCUcYXXjZAuTN5jxEs30ZB6KB97ZBUktp7ZBJwhTQW4q21akqbx8E9HuuQaLaKxHzSEzPuQNxkx2b1IPkXdrs9fcPU6IeP71rOxdvVlZBo2gZDZD'; 
}

APIRequest.prototype = {

    // check to see if accessToken is still valid
    checkAccessToken: function() {
        // come back and finish
    },

    // if accessToken is invalid, we have to get a new one 
    getAccessToken: function() {
        // come back and finish 
    }, 

    // get the facebook group posts
    getGroups: function() {
        var url = "https://graph.facebook.com/me/groups?access_token=" + this.accessToken, 
            group_id = this.group_id, 
            self = this; 

        return request( url, function( error, response, body ) {

            // grab the body response
            groups = JSON.parse( body );
            // catch and scream about errors...
            // don't understand what the indexOf.call does though
            if ( error ) {
                console.log( "error ", error );
                process.exit(); 
            } else if ( indexOf.call( groups, "error" ) >= 0 ) {
                console.log( "posts error ", groups.error );
                process.exit(); 
            }

            // now we have a list of groups
            // find save mah inbox group
            // save it's id so we can create an actual req to SMI posts
            console.log( "\n1. successful graph explorer api call \n" ); 
            for ( var i in groups.data ) {
                if ( groups.data[ i ].name === 'Save Mah Inbox' ) {
                    self.saveGroupId( groups.data[ i ].id );

                    console.log( "---- ASYNCHRONOUS CALL ... #3 is actually called before #2 ----" ); 
                    console.log( "2. successfully got group id...moving on... \n" ); 
                    self.getPostsForGroup(); 
                }
            }
        })
    }, 

    saveGroupId: function( group_id ) {
        this.group_id = group_id; 
    }, 

    getPostsForGroup: function() {
        console.log( "3. passing group id \n", this.group_id, "\n" ); 

        var url = "https://graph.facebook.com/" + this.group_id + "/feed?limit=100&access_token=" + this.accessToken + "& fields=from,to,message,picture,link,name,caption,description,created_time,updated_time,likes,comments.limit(999)";
        group_id = this.group_id, 
            self = this; 

        console.log( "4. requesting permission from facebook to get secret group posts" ); 
        /*
        return request( url, function( error, response, body ) {

            // grab the body response
            posts = JSON.parse( body );
            // catch and scream about errors...
            // don't understand what the indexOf.call does though
            if ( error ) {
                console.log( "error ", error );
                process.exit(); 
            } else if ( indexOf.call( posts, "error" ) >= 0 ) {
                console.log( "posts error ", posts.error );
                process.exit(); 
            }

        })
  */  
    }
}

function boundedWrapper( object, method ) {
    return function() {
        return method.apply( object, arguments );
    };
}

function getGroups( accessToken ) {
    var url = "https://graph.facebook.com/me/groups?access_token=" + accessToken;
}


a = new APIRequest(); 
a.getGroups(); 
