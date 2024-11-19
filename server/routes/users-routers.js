import express from "express"
import usersControllers from '../controllers/users-controller.js'

const router = express.Router()

router.patch('/update-avatar', usersControllers.updateAvatar)

export default router