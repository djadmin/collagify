var express = require("express");
var app = express();

app.use(express.static(__dirname + "/public"));


/* serves main page */
app.get("/", function(req, res) {
    res.sendFile(__dirname + '/public/index.html')
});


var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Listening on " + port);
});
