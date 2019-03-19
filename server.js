const express = require('express');
const _ = require('lodash');
const bodyParser = require('body-parser');

const {convertCurrency, getCountryDetails} = require('./utils/currency-converter.js');


var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));//This function will allow the users to access the files in public directory through url.


//requests
app.post('/convert', (req, res) => {
    var body = _.pick(req.body, ['from', 'to', 'amount']);

    if(!body.from || !body.to || !body.amount){
        res.status(400).send({message: 'invalid currency details'});
    }
    //convertCurrency(body.form, body.to, body.amount).then((data) => console.log(data)).catch((e) => console.log(e));
    convertCurrency(body.from, body.to, body.amount).then((data) => {
        res.send({response : data});
    }).catch((err) => {
        res.status(400).send({Error: 'Unable to get currency details.'});
    });
});

app.post('/country', (req, res) => {
    var body = _.pick(req.body, ['country']);

    if(!body.country){
        res.status(400).send({message: 'invalid country details'});
    }

    getCountryDetails(body.country).then((data) => {
        res.send({response : data});
    }).catch((err) => {
        res.status(400).send({Error: 'Unable to get country details.'});
    });
});


app.listen(port, () =>{
    console.log(`Server is up on port ${port}.`);
});