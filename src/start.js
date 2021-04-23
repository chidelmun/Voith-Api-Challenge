'use strict';

const { DataFactory } = require("./WikiPlacesController");
const path = require('path');

const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

const places = new DataFactory();

const expressApp = express();

const handleAllPlacesRequest = (req, res) => {
    let resData = places.findAll();
    if (req.query) {
        if (req.query.limit) {
            resData = places.findAll().splice(0, parseInt(req.query.limit));
        }
    }
    res.json(resData);
}

const handlePlacesByIdRequest = (req, res, id) => {
    res.json(places.findPlaceById(id));
}

const handleSearchRequest = (req, res) => {
    const data = places.findAll().filter((item) => {
        return item.description.search(req.query.searchText) !== -1 || item.name.search(req.query.searchText) !== -1;
    })
    res.json(data);
}

expressApp.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/index.html'));
});

expressApp.get('/api/places', (req, res) => {
    handleAllPlacesRequest(req, res);
});
expressApp.get('/api/places/all', (req, res) => {
    handleAllPlacesRequest(req, res);
});

expressApp.get('/api/places/search', (req, res) => {
    handleSearchRequest(req, res);
});

expressApp.get('/api/place/:id', (req, res) => {
    handlePlacesByIdRequest(req, res, parseInt(req.params.id));
});

expressApp.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
