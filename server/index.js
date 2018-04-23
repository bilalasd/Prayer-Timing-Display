const express = require('express')
const app = express()
var ntpClient = require('ntp-client');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/getNTPTime', (req, res) => {
    ntpClient.getNetworkTime("0.us.pool.ntp.org", 123, function (err, date) {
        if (err) {
            console.error(err);
            return;
        }
        res.send(date)
        res.end()
        console.log("Current time : ");
        console.log(date); // Mon Jul 08 2013 21:31:31 GMT+0200 (Paris, Madrid (heure d’été)) 
    });
})

app.listen(3001, () => console.log('Example app listening on port 3001!'))