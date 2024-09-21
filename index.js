import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import demoRouter from './demo/routes.js';
import userRouter from './user/routes.js';

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Configura body-parser para manejar JSON
app.use(bodyParser.urlencoded({ extended: true })); // Configura body-parser para manejar formularios codificados en URL


// Parse requests of content-type - application/json
app.use(bodyParser.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

demoRouter(app)
userRouter(app)
//db

// Connection to the local MongoDB database
const MONGODB_URI = process.env.MONGODB_URI;

if (MONGODB_URI) {
  mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("Connected to the local 'bemycar' MongoDB database.");
    })
    .catch(error => {
      console.log("Error in database configuration:", error);
      process.exit(-1);
    });
} else {
  console.log("Missing configurations to connect to the database.");
  process.exit(-1);
}



// simple route
app.get("/", (req, res) => {
  res.json({ message: "Its alive." });
});

// set port, listen for requests
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
