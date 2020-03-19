'use strict';

const path = require ('path')
const request = require('request')
const chalk = require('chalk');
const express = require('express')
const hbs = require('hbs')
const utils = require('./utils.js')

const port = process.env.PORT || 3000

const viewsPath = path.join (__filename, '../templates/views')
const partialsPath = path.join(__filename, '../templates/partials')
//const url = 'https://api.darksky.net/forecast/5de217c8aba0b3e74dbb472c1d1a9032/37.8267'
//const url2 = 'https://api.mapbox.com/geocoding/v5/mapbox.places/philedelphia.json?access_token=pk.eyJ1IjoiYW5jaGl0cGFuZGV5IiwiYSI6ImNrN3dhdWQ4bTAwOW0zZm1lNzYzdWpkMG4ifQ.cfqVdwzpWyDpfj4UGT1YSw&limit=1' 
const app = express()

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)  

app.use(express.static(path.join(__filename, '../public'))) 

app.get('', (req, res) => {

    res.render('index', {
        title: 'Index Page',
        name: 'Anchit Pandey'
    })

})

app.get('/about', (req, res) => {

    res.render('about', {
        title: 'About me ',
        name: 'Anchit Pandey'
    })  
})

app.get('/help', (req, res) => {    
    res.render('help', {
        title: 'Help Page',
        name: 'Anchit Pandey',
        id: '0050'
    })
})

app.get('/weather', (req, res) =>{

    if (!req.query.address) {
        return res.send({
            error: 'Please type in an address to get weather location from'
        })
    }
    const address = req.query.address;
   
    utils.toLatLng(address, (error, data) => {
        
        if (error)
            return res.send({error: error});
        else {
            const lat= data.latitude;
            const lng = data.longitude;
            console.log(lat);
            console.log(lng);
            const location = data.location;
            utils.weatherData(lat, lng, (error1, dataObject) => {

                if (error1) {
                    return res.send({ error: error1 });

                }
  //                  return { error1, undefined };
                else {
                    return res.send({ temperature: dataObject.temperature, summary:dataObject.summary })
 //                   return { undefined, dataObject };
                }
            })
        }
    })

    /*
    if (dataObj.error)
        return res.send({ error: dataObj.error });
    
    res.send({ prediction: dataObj.summary, temperature: dataObj.temperature });
 */
    
})

app.get('/help/*', (req, res) => {

    res.render('unknown', {
        title: 'No such help page found !'
    })
}
)

app.get('*', (req, res) => {

    res.render('unknown', {
        title: '404 brother !!'
    })
}
)


/*
app.get('', (req, res) => {
    res.send('Hello Express !!');
}
)


app.get('/help', (req, res) => {
    res.send('Help Page modified');
})


app.get('/about', (req, res) => {
    res.send('<h1>About the page</h1>');

})
*/



app.listen(port, () => {
    console.log('Server is up and running on port ' + port);
})