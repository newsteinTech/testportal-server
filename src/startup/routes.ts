import express from "express";
import { testRoutes } from "../routes/testRoutes";
import { questionRoutes } from "../routes/questionRoutes";
import { Authenticate } from "../middleware/authentication";

export class Routes{

    constructor(){

    }

    public static configRoutes(app: express.Application){

        app.get('/',(req, res)=>{

            res.send("server running")
        })

        app.use('/api/test', testRoutes)
        app.use('/api/question', Authenticate.authenticate, questionRoutes)

    }
}