import {Router} from "express"
import {questionController} from "../controllers/questionController"

export let questionRoutes = Router()

let questionControllerObj = new questionController()

questionRoutes.post("/create",questionControllerObj.create)