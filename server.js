var express = require('express'), 
    app = express(), 
    path = require('path'), 
    Datastore = require( 'nedb' ), 
    appDB = new Datastore( { filename: 'db/app.db.js', autoload: true } ); 

// apparently this is needed to serve up local files
app.use(express.static(__dirname + '/public/js'));

// you can use these as well 
//app.use('/img',express.static(path.join(__dirname, 'public/images')));
//app.use('/js',express.static(path.join(__dirname, 'public/javascripts')));
//app.use('/css',express.static(path.join(__dirname, 'public/stylesheets')));

app.get('/getAllPosts', function(req, res) {
    appDB.find( {}, function( err, els ) {
        //        console.log( els.length )
        posts = els;
        res.json({ db: els });
    })
});

app.get('server.js', function(req, res) {

console.log( "query got called! " );     
    
//    appDB.find( {}, function( err, els ) {
//        //        console.log( els.length )
//        posts = els;
//        res.json({ db: els });
//    })
});


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(8080);
console.log( "starting on port 8080..."); 