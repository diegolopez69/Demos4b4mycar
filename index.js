import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import demoRouter from './demo/routes.js';
import userRouter from './user/routes.js';
import mongoose from 'mongoose';
dotenv.config();

const app = express();

app.use(cors());

demoRouter(app)
userRouter(app)
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

// set port, listen for requests
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
