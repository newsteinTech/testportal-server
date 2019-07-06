import express from "express"
import bodyparser from "body-parser"
import {DB} from "./startup/db"
import {Routes} from "./startup/routes"

class testPortal {

    app:express.Application = express()

    constructor(){
        this.app.listen(3000,"localhost",()=>{
            console.log("Server is Running")
        })
        this.configBodyParser()
        DB.connectdB()
        Routes.configRouter(this.app)
    }

    configBodyParser(){
        this.app.use(bodyparser.json())
        this.app.use(bodyparser.urlencoded({
            extended:true
        }))
    }
}

const app =  new testPortal()