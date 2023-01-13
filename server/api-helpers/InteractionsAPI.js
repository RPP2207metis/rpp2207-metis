const axios = require('axios');
const TOKEN = process.env.API_TOKEN;

exports.postClickTrack = (req, res) => {

  var clickTrackData = req.body;
  // console.log("🚀 ~ file: InteractionsAPI.js:7 ~ clickTrackData", clickTrackData)

  var options = {
    url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/interactions',
    method: 'POST',
    headers: { Authorization: process.env.AUTH_SECRET },
    "Content-Type": 'application/json',
    data: clickTrackData
  };

  axios(options)
  .then((results) => {
    var clickTrackSuccess = JSON.parse(JSON.stringify(results.data));
    res.status(201).send(clickTrackSuccess);
  })
  .catch((error) => {
    console.log('failure in the api click track server: ', error);
    res.status(500).send(error);
  });
}