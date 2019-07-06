import {Router} from "express"
import { userController } from "../controllers/userController";

export const userRoutes = Router()

let userControllerObj = new userController()

userRoutes.post("/login",userControllerObj.loginUser)
userRoutes.post("/signUp",userControllerObj.signUpUser)