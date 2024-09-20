import { Schema, model  } from "mongoose";

const UserSchema = new Schema({
    name: String, 
    surnames: String, 
    userName: String, 
    password: String
}
)
const UserModel = model('User', UserSchema);

export default UserModel;