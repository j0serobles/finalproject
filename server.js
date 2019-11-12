const app      = require('express')();
const http     = require('http').createServer(app); 
const io         = require('socket.io')(http);

const mongoose   = require('mongoose');
const bodyParser = require('body-parser');
const passport   = require('passport');
const routes     = require("./routes");

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

// Add API routes:
// server.js <-- ./routes/index.js <-- ./routes/api/index.js <-- deliveries, users , etc.
app.use(routes);

// Send every other request to the React app
// Define any API routes before this runs
// Note: For dev environment, you need to run the build, so the file is available.

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
});

//On new socket.io connection:
io.on('connection' , socket => {
  console.log (' User connected.');

  socket.on('delivery-offer', deliveryId => {
    io.emit(`${deliveryId}`, 'I would to it for free');
  }); 

  socket.on('offer-accepted', deliveryId => {
    io.emit(`${deliveryId}-accepted`, `${deliveryId} Offer accepted`);
  });
});
  
//Call listen() on the server, not the app
http.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
