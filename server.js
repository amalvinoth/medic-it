const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json());








// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log(err,'Could not connect to the database. Exiting now...');
    process.exit();
});







// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to MedicIT application. Our primary goal is to enable the Healthcare Professions to save their time by leveraging latest software technologies"});
});





// Require Notes routes
require('./app/routes/item-master.routes.js')(app);
require('./app/routes/supplier-master.routes.js')(app);
require('./app/routes/order-list.routes.js')(app);





// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
