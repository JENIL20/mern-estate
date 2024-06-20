import User from "../models/user.model.js"
import { errorHandler } from "../utils/error.js"
import bcryptjs from 'bcryptjs'

export const test = (r, res) => {
  res.send("jedvzxczxnil")
}
export const updateUser = async (req, res, next) => {
  // console.log(req.user.id === req.params.id)
  // console.log(req.params.id)
  // console.log(req.user.id)

  // if (req.user.id !== req.params.id) return next(errorHandler(401, "you update your account"))
  try {
    if (req.body.password) req.body.password = bcryptjs.hashSync(req.body.password, 10)
    console.log(req.params.id);
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
      $set: {
        username: req.body.user,
        email: req.body.email,
        password: req.body.password,
        avatar: req.body.avatar
      }
    }, { new: true })
    console.log(updatedUser);
    const { password, ...rest } = updatedUser._doc
    res.status(200).json(rest)
  } catch (error) {

  }
}

export const deletUser = async (req, res, next) => {
  // if (req.user.id !== req.params.id) return next(errorHandler(401, "you can delete only your account"))

  try {
    await User.findByIdAndDelete(req.params.id)
    res.status(200).json('user deleted successfully')
  } catch (error) {

  }
}