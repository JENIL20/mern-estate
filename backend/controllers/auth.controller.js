import User from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import { errorHandler } from "../utils/error.js"
import jwt from 'jsonwebtoken'

/////////////////// SIGNUP ////////////////////////

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body
  const hashedpassword = bcryptjs.hashSync(password, 10)
  const newUser = new User({ username, email, password: hashedpassword })
  try {
    await newUser.save()
    res.status(201).json("user Created SUCCESSFULLY!!")
  } catch (error) {
    next(error)
  }
}

/////////////////// LOGIN ////////////////////////

export const signin = async (req, res, next) => {
  const { email, password } = req.body
  try {
    const validuser = await User.findOne({ email })
    // console.log("aa gay");
    if (!validuser) return next(errorHandler(404, "user not found"))
    const validpassword = bcryptjs.compareSync(password, validuser.password)
    if (!validpassword) return next(errorHandler(401, "Incorrect password"))
    const token = jwt.sign({ id: validuser._id }, process.env.JWT_SECRET)
    const { password: pass, ...rest } = validuser._doc
    console.log(validuser);
    return res.cookie('access_cookie', token, { httpOnly: true, expires: new Date(Date.now() + 60 * 60) })
      .status(200)
      .json(rest)

  } catch (error) {

  }
}