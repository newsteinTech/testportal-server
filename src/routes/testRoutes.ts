import {Router} from "express"
import {testController} from "../controllers/testController"

export let testRoutes = Router()
let testControllerObj = new testController()

testRoutes.post("/book",testControllerObj.bookTest)

