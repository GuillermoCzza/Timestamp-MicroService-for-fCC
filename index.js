// index.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});



//handle the timestamp request
app.get("/api/:date?", function(req, res) {
	
  function isNumeric(str) {
    return /^-?\d+$/.test(str);
  }
  
	
  //format UTC syle date to my needs
  function getCustomUTC(date) {
    return new Date(date).toString()
      .replace('+0000 (Coordinated Universal Time)', '') //remove that last bit at the end
      .replace(/(^[A-Z][a-z]{2})/, '$1,') //add a comma after the day
      .replace(/([A-Z][a-z]{2}) (\d{1,2})/, '$2 $1'); //swap the month and month day positions
  }

  
  let unix;
  let utc;
  if (!req.params.date) {
    //if no date param
    unix = Date.now();
    utc = getCustomUTC(Date.now());
    
  } else {
    let dateInput = req.params.date;
    
    if (isNumeric(dateInput)) {
      //if it's a Unix timestamp
      dateInput = parseInt(dateInput);
      unix = dateInput;
      utc = getCustomUTC(dateInput);
      
    } else if (new Date(dateInput) == "Invalid Date") {
      //if it's an invalid date  
      res.json({ error: "Invalid Date" });
	  return;

    } else {
      //if it's a valid date string
      unix = new Date(dateInput).getTime();
      utc = getCustomUTC(dateInput);
    }
  }
  
//actually send the HTTP response with the correct data
res.json({ unix: unix, utc: utc });
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
