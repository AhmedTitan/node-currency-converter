const express = require('express');
//const hbs = require('hbs');
//const fs = require('fs');


var app = express();
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));//This function will allow the users to access the files in public directory through url.


//requests


app.listen(port, () =>{
    console.log(`Server is up on port ${port}.`);
});