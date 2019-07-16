import {Router} from "express"
import {actualTestController} from "../controllers/actualTestController"

export let actualtestRoutes = Router()

let actualTestControllerObj = new actualTestController()

actualtestRoutes.post("/create",actualTestControllerObj.create)
actualtestRoutes.post("/start",actualTestControllerObj.start)
actualtestRoutes.post("/submit",actualTestControllerObj.submit)