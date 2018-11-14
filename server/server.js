require('rootpath')();
const express = require('express');
const app = express();
const helmet = require('helmet');
const router = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('app/_helpers/jwt');
const errorHandler = require('app/_helpers/error-handler');
const routes = require('./app/routes');
const config = require('./config');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(jwt());
app.use(errorHandler);
app.use(config.root, router);
app.use(helmet());

// api routes
routes(router);

const port = process.env.NODE_ENV === 'production' ? 80 : 5000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
