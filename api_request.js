var express = require('express'), 
    path = require('path'), 
    levelup = require( 'levelup' ), 
    _ = require('underscore'), 
    moment = require( 'moment' ),
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
    this.downloadSince = null;
    this.group_id = ""; 
    this.accessToken = 'CAACEdEose0cBAMm7Y1a7cOi2y4u6hkzFcZCG3QaAvEsI4GINgSczzc0So1Gr7GQnY5fcsPEQySf3ZBqD7Pm9V677xIXEsSLoUrT8UMZCwYZBzOzHsQ3ft57WdGuXLLbKnbmVnYqUA59ytP9hoOSE7MxGaoeeLmc0MCZC1q8MGLvNViPkS7jqURnJhMRcHMPSjb2StbgW1gQZDZD'; 
    this.posts = [];
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

        var url = "https://graph.facebook.com/" + this.group_id + "/feed?limit=1000&access_token=" + this.accessToken + "& fields=from,to,message,picture,link,name,caption,description,created_time,updated_time,likes,comments.limit(999)";
        group_id = this.group_id, 
            self = this; 

        console.log( "4. requesting permission from facebook to get secret group posts" ); 

        // TODO 
        // we'll have to create a database or figure out a way to use the UNTIL & SINCE clauses in the get request
        var new_url = this.timeParamUrl( null, null, url ); 
        
        return request( new_url, function( error, response, body ) {

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

            console.log( "\n", posts.data.length, " posts " ); 

        })
        
    }, 
    
    timeParamUrl: function( since, untilTime, url ) {
        if ( since == null) {
            since = null;
        }
        if ( untilTime == null ) {
            untilTime = null;
        }
        
        if ( untilTime == null ) {
            url += "&until=" + ( moment().unix() );
            untilTime = moment().unix();
        } else {
            url += "&until=" + untilTime;
        }
        if ( since != null ) {
            url += "&since=" + since;
        } else {
            if ( this.downloadSince != null ) {
                url += "&since=" + this.downloadSince;
            } else {
                url += "&since=0";
            }
        }
        return url;
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
