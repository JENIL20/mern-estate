import express from 'express'
import { deletUser, test, updateUser } from '../controllers/user.controller.js'
import { verifyUser } from '../utils/verifyUser.js'

const router = express.Router()

router.get('/', test)
router.post('/update/:id', updateUser)
router.delete('/delete/:id', deletUser)

export default router