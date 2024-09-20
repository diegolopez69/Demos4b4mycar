import { generateToken } from "../utils/authService.js";
import UserModel from "./model.js";
import bcrypt from "bcrypt";

export const createUser = async (req, res) => {
  const { name, surnames, userName, password } = req.body;

try{
  if(name && surnames && userName && password){
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const user = new UserModel({
        name: name,
        surnames: surnames,
        userName: userName,
        password: hashPassword,
    });

    let result = await user.save();
    res.json({ result: result });
    
  }else{
    res.status(400).send({
        message: "Parametros insuficientes"
    })
  }
    
  } catch (error) {
    res.json({ error: error });
  }
};

export const getUsers = async (req, res) => {
  try {
    // let result = await UserModel.findAll();
    // res.json({result: result})
    res.json({ result: req.body });
  } catch (error) {
    console.log(error);
    res.json({ error: error });
  }
};

export const login = async (req, res) => {
  console.log("Login start");
  const { userName, password } = req.body;

  try {
    console.log("Buscando User");
    let user = await UserModel.findOne({ userName: userName });

    if (user) {
      console.log("User encontrado");

      const match = await bcrypt.compare(password, user.password);
      //TODO: GENERAMOS TOKEN

      if (match) {
        console.log("Hay match");
        const id= user._id;
        const token = await generateToken(id);

        console.log(token)
        res.status(200).json({ token: token });
      } else {
        res.status(401).json({ result: "Contraseña incorrecta" });
      }
    } else {
      res.status(404).json({ result: "No se ha encontrado el usuario" });
    }
  } catch (error) {}
};