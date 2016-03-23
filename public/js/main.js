// GLOBAL FUNCTIONS
function nada() {
    // does nothing
    // useful for ternary operator clauses
}

function httpError() {
    console.log( "there was an error retrieving the posts from the db..." ); 
}

db = []; 
$.get( "/getAllPosts", function( data ) {
    // to display all the db data
    show( data ); 

    // console out the outcome
    ( data.db === undefined ) ? httpError() : console.log( "successfully have all ", data.db.length, " posts!" ); 
});

function show( data ) {
    console.log( 'aaah ', data.db )
    db = data.db;

    // create DOM elements...might need a fallback for jQuery
    var main = $( 'main' ), 
        container = $( '<div></div>' );

    // just loop through and grab 20 for testing purposes...there are over 900
    for ( var i = 0; i < 20; i ++ ) {
        var p = $( '<p></p>' ); 
        p.text( db[ i ].name ); 
        container.append( p ); 
    }

    // append all the elements to the DOM
    main.append( container );
}

$( document ).ready( function() {

    // clear this area
    $( '#trigger' ).val( "" ); 

    $( 'button' ).on( 'click', function() {

        var query = ( $('#trigger').val().length > 0 ) ? $('#trigger').val() : 'NA';
        if ( query !== 'NA' ) {
            $.get( "server.js", query, function( data ) {
                // to display all the db data
                console.log( "searched the db " ); 
            });
        }

    })

}); 