const express = require('express');
const person = require('../routes/person')
const test = require('../routes/api/test')
const app = express();

module.exports = function(app){
    app.use(express.json());
    app.use('/api/person', person); 
    app.use('/api/test', test);
    console.log('new file has been tested.');
}

