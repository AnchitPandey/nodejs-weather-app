const express = require('express')
const request = require('request')
const chalk = require ('chalk')
const weatherAtCoords = 'https://api.darksky.net/forecast/5de217c8aba0b3e74dbb472c1d1a9032/37.8267'
const nameToCoords = 'https://api.mapbox.com/geocoding/v5/mapbox.places/philedelphia.json?access_token=pk.eyJ1IjoiYW5jaGl0cGFuZGV5IiwiYSI6ImNrN3dhdWQ4bTAwOW0zZm1lNzYzdWpkMG4ifQ.cfqVdwzpWyDpfj4UGT1YSw&limit=1'


const toLatLng = (address, callback) => {

    const nameToCoords = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYW5jaGl0cGFuZGV5IiwiYSI6ImNrN3dhdWQ4bTAwOW0zZm1lNzYzdWpkMG4ifQ.cfqVdwzpWyDpfj4UGT1YSw&limit=1&units=si'
 
    request({ url: nameToCoords, json: true }, (error, res) => {
        if (error) {
            callback('Kindly check your internet connnection', undefined);
        //    console.log(chalk.red('Kindly check your internet connection'));
        }
        else if (res.body.features.length == 0)
            callback('Give valid input', undefined);
        else {
            const location = res.body.features[0].place_name;
            const lat = res.body.features[0].center[1];
            const lng = res.body.features[0].center[0];
            callback(undefined, { latitude: lat, longitude: lng, location: location })     
        }
    })
}


const weatherData = (lat, lng, callback) => {

    weatherURL = 'https://api.darksky.net/forecast/5de217c8aba0b3e74dbb472c1d1a9032/' + lat + ',' + lng;
    request({ url: weatherURL, json: true }, (error, res) => {
        console.log(weatherURL);
        if (error)
            callback('Net-Connection Error', undefined)
        else if (res.body.error)
            callback(weatherURL, undefined)
        else {
            const temp = res.body.currently.temperature;
            //const summary = res.body.minutely.summary;
            const summary = res.body.currently.summary;
           
            callback(undefined, {
                temperature: temp,
                summary: summary
            })
        }
    })
}
/*
toLatLng(address, (error,data) => {

    if (error)
        return { error, undefined };
    else {
        const lat = data.lat;
        const lng = data.lng;
        const location = data.location;
        weatherData(lat, lng, (error, dataObject) => {

            if (error)
                return { error, undefined };
            else {
                return { undefined, dataObject };
            }
        })
    }
})
*/
module.exports = { toLatLng , weatherData };