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
    this.count = 0; 
    this.accessToken = 'CAACEdEose0cBANEXY3NLreigelxsQUSwdkPzH9ZBJZCZAyoGLTbUXda5lqphEeWQmGpAH3gny2jcmc9ouKgZCT7KUFwrod4jGllxO39dcuBP9ZBZA5HmZCEktRpilmTi1NF1Q5CyQBEzbfVKjiS1Y2G5LNFSr6atzZC5ajiRGOOfeWZAycnX86a5k7aLoYsyrtFWWBcZBIJZBUb2QZDZD'; 
    this.posts = [];
    this.new_until = null; 
}
//CAACEdEose0cBAKiTPsMpjHZCDvZAade8PoqHkd8NSpR5LV0eojv1jpNQE9shg0c9y9wzmnuSx3QOLZAFCpjZAGfiJpNXqYJk4Hb2bMZAcxz7zhKJ9utejepjWZB1I66VPeldw67VFmpp4iRZAMQgwXhtEBp4VmooDtKSZBw0KedAIJMnKSFGq2mw54lH0wV1iNXpXSjwqVkTjwZDZD

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
                    self.getPostsForGroup( null ); 
                }
            }
        })
    }, 

    saveGroupId: function( group_id ) {
        this.group_id = group_id; 
    }, 

    getPostsForGroup: function( _url ) {
        console.log( "3. passing group id \n", this.group_id, "\n" ); 

        // retrieve all updated times from the post object & sort it
        function sortedUpdated( posts ) {
            return _.pluck( posts.data, 'updated_time' ).sort(); 
        }

        var group_id = this.group_id, 
            accessToken = this.accessToken, 
            new_until = this.new_until, 
            _POSTS = this.res_data, 
            count = this.count, 
            self = this; 

        if ( _url ) {
            //            if ( _POSTS.length > 1100 ) process.exit(); 
            console.log( "4. requesting permission from facebook to get secret group posts" ); 

            // TODO 
            // we'll have to create a database or figure out a way to use the UNTIL & SINCE clauses in the get request
            return request( _url, function( error, response, body ) {

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

                // the new_until variable keeps moving as you progress through the posts. 
                // even if you limit it to 100, you just recurse through until you're back at o. 
                //            new_until =  moment( _.first sortedUpdated( posts ) ).unix() - 1; 
                console.log( "\n", moment( _.first( sortedUpdated( posts ) ) ).format("dddd, MMMM Do YYYY, h:mm:ss a"), "  is the oldest update in this loop" ); 
                new_until = moment( _.first( sortedUpdated( posts ) ) ).unix() - 1; 
                var use = self.timeParamUrl( null, new_until, url );
                count += posts.data.length; 
                self.getPostsForGroup( use ); 
            })
        }
        else {

            if ( count.length > 1100 ) process.exit(); 

            var url = "https://graph.facebook.com/" + group_id + "/feed?limit=100&access_token=" + accessToken + "& fields=from,to,message,picture,link,name,caption,description,created_time,updated_time,likes,comments.limit(1000)";

            console.log( "4. requesting permission from facebook to get secret group posts" ); 

            // TODO 
            // we'll have to create a database or figure out a way to use the UNTIL & SINCE clauses in the get request
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

                // the new_until variable keeps moving as you progress through the posts. 
                // even if you limit it to 100, you just recurse through until you're back at o. 
                //            new_until =  moment( _.first sortedUpdated( posts ) ).unix() - 1; 
                console.log( "\n", moment( _.first( sortedUpdated( posts ) ) ).format("dddd, MMMM Do YYYY, h:mm:ss a"), "  is the oldest update in this loop" ); 
                new_until = moment( _.first( sortedUpdated( posts ) ) ).unix() - 1; 
                var use = self.timeParamUrl( null, new_until, url ); 
                count += posts.data.length; 
                self.getPostsForGroup( use ); 
            })
        }
    }, 

    timeParamUrl: function( since, untilTime, url ) {
        if ( since === null) {
            since = null;
        }
        if ( untilTime === null ) {
            untilTime = null;
        }

        if ( untilTime === null ) {
            url += "&until=" + ( moment().unix() );
            untilTime = moment().unix();
        } else {
            url += "&until=" + untilTime;
        }
        if ( since !== null ) {
            url += "&since=" + since;
        } else {
            if ( this.downloadSince !== null ) {
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
