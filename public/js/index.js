
var convertButton = jQuery('#convert');
convertButton.on('click', function() {
    convertButton.attr('disabled', 'disabled').text('Converting');
    var from = jQuery('#from').val();
    to = jQuery('#to').val();
    var amount = parseInt(jQuery('#amount').val());
    var body = {from: from, to: to, amount: amount};

    getCurrencyDetails(body);      
});


//Functions
var getCurrencyDetails = function(body){
    const Http = new XMLHttpRequest();
    Http.open("POST", 'http://localhost:3000/convert');
    //Http.setRequestHeader('Authorization', 'Bearer ' + access_token);
    Http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    //Http.onload = requestComplete;
    Http.send(JSON.stringify(body));
   
    Http.onreadystatechange= function (e){
        try{
            if (this.status === 200){
                var res = JSON.parse(Http.responseText);
                console.log(res.response);
                jQuery('#currencyDetails').text(res.response) ;
                getCountryDetails(to);
            }else if(this.status === 400){
                sendAlert('Unable to get currency details. Please check the information.');
            }
        }catch(e){
            
        }
    }
};

var getCountryDetails = function(body){
    const Http = new XMLHttpRequest();
    Http.open("POST", 'https://morning-chamber-42980.herokuapp.com/'+'http://localhost:3000/country');
    Http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    Http.send(JSON.stringify({country: body}));
   
    Http.onreadystatechange= function (e){
        try{
            if(this.status === 200){
                var res = JSON.parse(Http.responseText);
                console.log(res.response);
                jQuery('#c_capital').text(res.response.capital);
                jQuery('#c_region').text(res.response.region);
                jQuery('#c_subregion').text(res.response.subregion);
                jQuery('#c_currencyName').text(res.response.currencies);
                jQuery('#c_population').text(res.response.population);
                convertButton.removeAttr('disabled').text('Convert');
            }else if(this.status === 400){
                sendAlert('Unable to get country details at the moment');
                convertButton.removeAttr('disabled').text('Convert');
            }
        }catch(e){
            convertButton.removeAttr('disabled').text('Convert');
        }
    }
    
}


var sendAlert = function(message){
    alert(message);
};