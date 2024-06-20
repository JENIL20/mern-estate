import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userrouter from './routes/user.route.js'
import authrouter from './routes/auth.route.js'
import cookieParser from 'cookie-parser';
import cors from 'cors'

dotenv.config();

// console.log(process.env.MONGOURL);
mongoose.connect(process.env.MONGOURL)
  .then(() => {
    console.log("connected to backend");
  })
  .catch((err) => {
    console.log(err);
  })
const app = express()


app.use(express.json())
app.use(cookieParser())
app.use(cors())


app.get("/", (req, res) => {
  res.send("dhfasd")
})

app.use('/api/user', userrouter)
app.use('/api/auth', authrouter)

app.use((err, req, res, next) => {
  const statuscode = err.statuseCode || 500;
  const errmsg = err.message || "Internal server Error"
  return res.status(statuscode).json({
    success: false,
    statuscode,
    errmsg,
  })
})








app.listen(3000, (req, res) => {
  console.log("connected at 3000");
})