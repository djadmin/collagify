var express = require("express");
var app = express();

app.use(express.static(__dirname + "/client"));


/* serves main page */
app.get("/", function(req, res) {
    res.sendFile(__dirname + '/client/index.html')
});


var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Listening on " + port);
});
