var express  = require('express');
var app = express();
var router = express.Router();
var port = process.env.PORT || 5000;
var bodyParser = require('body-parser');
var cors = require('cors');
var helmet = require('helmet');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var routes = require('./app/routes/');
var auth = require('./app/authentication');
var db = require('./app/database');

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());
app.use(cors());

// Express Session
app.use(session({
    secret: 'notverysecretsecret',
    saveUninitialized: true,
    resave: true
}));

app.get('/', (req, res) => res.send('Hello World!'));

routes(router);
auth.initializeAuth(app);
db.connectToDB();

app.use('/api', router);

app.listen(port, () => console.log(`Listening on port ${port}!`));
