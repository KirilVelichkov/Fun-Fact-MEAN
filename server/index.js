'use strict';

const express = require('express');

const app = express();
const stage = process.env.NODE_ENV || 'development';
const config = require('./config/config')[stage];
const passport = require('passport');
const database = require('./config/database')(config);
const data = require('./data')();
const cors = require('cors');
const auth = require('./config/auth');

app.use(cors());

const encryption = require('./utilities/encryption');

require('./config/express')(config, app);
const controllers = require('./controllers')({ app, encryption, data, passport });
require('./routers')({ app, controllers, passport, auth });



app.listen(config.port, () => console.log('Server running at port : ' + config.port));