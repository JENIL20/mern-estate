import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'

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

app.listen(3000, (req, res) => {
  console.log("connected at 3000");
})