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
    res.cookie('access_token', token, { httpOnly: true, expires: new Date(Date.now() + 60 * 60) })
    return res.status(200)
      .json(rest)

  } catch (error) {

  }
}



/////////////////// GOOGLE-LOGIN ////////////////////////

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
      const { password: pass, ...rest } = user._doc

      res
        .cookie('access_cookie', token, { httpOnly: true, expires: new Date(Date.now() + 60 * 60) })
        .status(200)
        .json(rest)
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(' ').join('').toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error)
  }
}