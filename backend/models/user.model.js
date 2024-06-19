import { timeStamp } from "console";
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4Y4d_9x8ebL0d0uGM776VrF1Ptwe7vyHDJA&s"
  }

}, { timestamps: true })

const User = mongoose.model('User', userSchema)

export default User