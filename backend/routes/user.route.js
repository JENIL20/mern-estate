import express from 'express'
import { test, updateUser } from '../controllers/user.controller.js'
import { verifyUser } from '../utils/verifyUser.js'

const router = express.Router()

router.get('/', test)
router.post('/updateuser/:id', verifyUser, updateUser)

export default router