const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser'); 
const logger = require('morgan');
const User = require('./Schemas/User');
const API_PORT = process.env.PORT || 3001;
const path = require('path')
const app = express();
let dbRoute = ""

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

router.post("/getData", (req, res) => { 
  console.log("inside getData")
  const { postemail, postpassword } = req.body
  User.find({email: postemail, password: postpassword}, (err, data) => {             
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

router.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
// this is our update method
// this method overwrites existing data in our database
router.post("/updateData", (req, res) => {
  const { email, password } = req.body;
  User.findOneAndUpdate(email, password, err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// this is our delete method
// this method removes existing data in our database
router.delete("/deleteData", (req, res) => {
  const { email, password } = req.body;  
  User.findOneAndDelete({email: email}, {password: password}, err => {    
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

// this is our create methid
// this method adds new data in our database
router.post("/putData", (req, res) => {
  console.log("inside putData")
  let user = new User();

  const { postemail, postpassword } = req.body;  
  if (!postemail || !postpassword) {
    return res.json({
      success: false,
      error: "INVALID INPUTS"
    });
  } 
  console.log("postemail"+postemail)
  user.password = postpassword;
  user.email = postemail;
  user.save(err => {
    console.log("err"+err)
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});


// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));

