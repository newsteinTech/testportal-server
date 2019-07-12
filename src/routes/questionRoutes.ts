import {Router} from "express"
import {questionController} from "../controllers/questionController"

export let questionRoutes = Router()

let questionControllerObj = new questionController()

questionRoutes.post("/create",questionControllerObj.create)
questionRoutes.post("/update",questionControllerObj.update)
questionRoutes.get("/getAll",questionControllerObj.getAllQuestions)
questionRoutes.get("/getById/:Id",questionControllerObj.getById)
questionRoutes.delete("/delete",questionControllerObj.deleteById)