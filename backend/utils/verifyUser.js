import { errorHandler } from "./error.js"
import jwt from 'jsonwebtoken'

export const verifyUser = (req, res, next) => {
  // console.log("start");
  const token = req.body.access_token
  if (!token) return next(errorHandler(401, "Unauthorisdfgsdfgzed"))

  try {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      // console.log(user);
      if (err) return next(errorHandler(403, "Forbidden"))
      // console.log("success");
      req.user = user
      next()
    })
  } catch (error) {
    console.log(error);
  }
} 