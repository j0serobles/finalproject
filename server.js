const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const routes = require("./routes");

// const users = require('./routes/api/users');

const app = express();
const port = process.env.PORT || 5000;

//Which front end to use, basaed on NODE_ENV variable
if(process.env.NODE_ENV === "production") {
    app.use(express.static("client/build")); 
}

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Which DB to connect to, based on NODE_ENV
let db = null;
if(process.env.NODE_ENV === "production") {
  db = process.env.MONGODB_URI || require("./config/keys").mongoURI;
}
else {
  db = process.env.MONGODB_URI || require("./config/keys").mongoDevURI;
}
mongoose.connect(db, { useNewUrlParser: true }).then(() => console.log(`MongoDB connected`)).catch((err) => console.log(err));
console.log ( JSON.stringify(db, '', 2)); 

app.use(passport.initialize());
require('./config/passport')(passport);

//app.use('/api/users', users);

// Add routes, both API and view
app.use(routes);

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});