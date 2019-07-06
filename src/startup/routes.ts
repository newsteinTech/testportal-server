import express from "express"
import {testRoutes} from "../routes/testRoutes"
import {userRoutes} from "../routes/userRoutes"
import {questionRoutes} from "../routes/questionRoutes"
import {Authentication} from "../middleware/authentication"

export class Routes {

    
    public static configRouter(app:express.Application){
        app.get("/",(req:express.Request,res:express.Response)=>{
            res.send("Started")
        })
        app.use("/api/test",testRoutes)
        app.use("/api/user",userRoutes)
        app.use("/api/question",Authentication.authenticate,questionRoutes)
    }
}
