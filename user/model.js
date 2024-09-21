import { Schema, model  } from "mongoose";

const UserSchema = new Schema({
    name: {type: String, required: false},
    surnames: {type: String, required: false}, 
    userName: {type: String, required: true},
    password: {type: String, required: true},
}
)
const UserModel = model('User', UserSchema);

export default UserModel;