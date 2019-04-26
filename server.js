const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser'); 
const logger = require('morgan');
const API_PORT = process.env.PORT || 3001;
const path = require('path')
const app = express();
let dbRoute = ""
var medicRoutes = require('./modules/medicRoutes');
var userRoutes = require('./modules/userRoutes');
var healingRoutes = require('./modules/healingRoutes');

app.use(cors());

//************************DB Code ********************************
// this is our MongoDB database

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  dbRoute =  "mongodb://localhost:27017/newdb"
} else {
  dbRoute =  "mongodb+srv://satgawas:Home123$@cluster0-wqioz.mongodb.net/test?retryWrites=true"
} 

//const dbRoute = "mongodb://localhost:27017/newdb"

mongoose.connect(
  dbRoute,
  { useNewUrlParser: true }
);

let db = mongoose.connection;
db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

//********************Express Code ********************************
//app.set('views', __dirname + '/build'); // Set views (index.html) to root directory
const router = express.Router();
// append /api for our http requests

//app.use(express.static(path.join(__dirname, 'build')));
// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger("dev"));

app.use('/', express.static(__dirname + '/build'));
app.use("/", router);

//-------------------User db Updates-------------------
userRoutes(router);

//-------------------Medic db Updates------------------
medicRoutes(router);

//-------------------Healing db Updates----------------
healingRoutes(router);


router.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));

