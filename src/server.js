// This file is the entry point for the server. It sets up the server and routes.
const express = require("express");
const cors = require("cors");
const app = express();
const axios = require("axios");
const bodyParser = require('body-parser');

const allowedOrigins = ['https://pawsitivedaycare-backend.onrender.com', 'http://localhost:3000', 'https://zippy-tartufo-996534.netlify.app'];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); 
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  credentials: true, 
};
// const corsOptions = {
//   origin: '*', // CHANGE TO FRONTEND DOMAIN
//   methods: 'GET,POST,PUT,DELETE,PATCH',
//   // allowedHeaders: 'Content-Type,Authorization',
// };

app.use(cors(corsOptions)); 

app.options('*', cors(corsOptions)); // Enable pre-flight request for all routes

app.use(express.json());

app.use(bodyParser.urlencoded({
  extended: true
}));

// parse application/json
app.use(bodyParser.json())

app.get("/",(request, response) => {
    response.send("Home Route");
})

// Importing the user routes
const userRoutes = require("../src/routes/user_routes");
app.use("/users", userRoutes);


const bookingRoutes = require("../src/routes/booking_routes")
app.use("/mybookings", bookingRoutes);


module.exports = {
  app
};
