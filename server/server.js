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
const morgan = require('morgan');
const fs = require('fs');
const https = require('https');

app.use(morgan('combined'));
app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '2mb' }));
app.use(jwt());
app.use(config.root, router);

// api routes
routes(router);

app.use(errorHandler);

const port = 4000;
const env = process.env.NODE_ENV || 'dev';
switch (env) {
    case 'dev':
        const server = app.listen(port, function () {
            console.log('HTTP Development server running on port ' + port);
        });
        break;
    case 'prod':
        const privateKey = fs.readFileSync('/etc/letsencrypt/live/dragncode.tk/privkey.pem', 'utf8');
        const certificate = fs.readFileSync('/etc/letsencrypt/live/dragncode.tk/cert.pem', 'utf8');
        const ca = fs.readFileSync('/etc/letsencrypt/live/dragncode.tk/chain.pem', 'utf8');
        const credentials = {
            key: privateKey,
            cert: certificate,
            ca: ca
        };
        const httpsServer = https.createServer(credentials, app);
            httpsServer.listen(port, () => {
	        console.log('HTTPS Production server running on port '+port);
        });
        break;
}
