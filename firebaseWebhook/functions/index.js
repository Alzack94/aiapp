// Copyright 2017, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

const http = require('http');
const functions = require('firebase-functions');

const host = 'api.openweathermap.org';
const apiKey = '927afdda6e44ae8da022a2eb80007522';

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((req, res) => {
  // Get the city and date from the request
  let city = req.body.queryResult.parameters['geo-city']; // city is a required param

  // Get the date for the weather forecast (if present)
  let date = '';
  if (req.body.queryResult.parameters['date']) {
    date = req.body.queryResult.parameters['date'];
    console.log('Date: ' + date);
  }

  // Call the weather API
  callWeatherApi(city, date).then((output) => {
    if (!output || !output.exists) {
      throw new Error("Output doesn't exist")
   }
    res.json({ 'fulfillmentText': output }); // Return the results of the weather API to Dialogflow
    return output;
  }).catch(() => {
    res.json({ 'fulfillmentText': `I don't know the weather but I hope it's good!` });
  });
});

function callWeatherApi (city, date) {
  return new Promise((resolve, reject) => {
    // Create the path for the HTTP request to get the weather
    let path = '/data/2.5/weather' +
      '?q=' + encodeURIComponent(city) + '&appid=' + apiKey;
    console.log('API Request: ' + host + path);

    // Make the HTTP request to get the weather
    http.get({host: host, path: path}, (res) => {
      let body = ''; // var to store the response chunks
      res.on('data', (d) => { body += d; }); // store each response chunk
      res.on('end', () => {
        // After all the data has been received parse the JSON for desired data
        let weather = JSON.parse(body);
        

        // Create response
        let output = `It's ${weather.main.temp} degrees in ${weather.name}! having ${weather.weather[0].description}`;

        // Resolve the promise with the output text
        console.log(output);
        resolve(output);
      });
      res.on('error', (error) => {
        console.log(`Error calling the weather API: ${error}`)
        reject();
      });
    });
  });
}