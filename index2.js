const config = require('./src/config')
const express = require('express');
const app = express();

require('./startup/routes')(app);
const db = require('./startup/dtConnection');



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));



 

