const express = require('express');
const app = express();

// This will get us a reference to or configurator object (index.js will load automatically)
const config = require('./config');

// Get a reference to the mongoose data model package
const mongoose = require('mongoose');

// This will get a reference to the seed data controller to generate the seed data and give me a function
const setupController = require('./controllers/setupController');

// This will get a reference to our web API controller for handling web client requests
const apiController = require('./controllers/apiController');

// Set express to listen to the public directory
const port = process.env.PORT || 5000;

// This setups a place to serve static content from the directory ./public but we will use an alias called /assets
app.use('/assets', express.static(__dirname + '/public')); // __dirname will be set to the directory we are running the node app from

// Identify the template engine we intend to use
app.set('view engine', 'ejs');

// Actually connect to the database (lets use a promise)
mongoose.connect(config.getDbConnectionString(),{ useNewUrlParser: true }).then(
    ()=> {
        console.log("Successfully connected to the database.");
    },
    err => {
        console.log("ERROR connecting to the database.");
        throw err;
    }
);

// Setup route handlers for loading seed data
setupController(app);

// Setup route handlers for web API
apiController(app);

// Start listening for requests
console.log(`Listener started on port ${port}...`);
app.listen(port);
