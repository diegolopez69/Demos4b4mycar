import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import demoRouter from './demo/routes.js';
import mongoose from 'mongoose';

const app = express();

dotenv.config();

app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


//db
const MONGODB_URI = process.env.MONGODB_URI

if(MONGODB_URI){
  mongoose.connect(MONGODB_URI)
  .then(()=>{

  })
  .catch(error=>{
    console.log("Configuración incorrecta.")
  process.exit(-1)
  })
}else{
  console.log("Falta configuraciones para conectar.")
  process.exit(-1)
}

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Its alive." });
});

demoRouter(app)


// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
