let express = require("express");
let app = express();
app.use(express.static('src'));

app.listen(8000, function(){
    console.log("App is running on port 8000");
});

app.get("/", function(req, res){
    res.sendfile("src/index.html");
});