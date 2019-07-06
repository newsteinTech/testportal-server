import express from 'express';
import *as mongoose from 'mongoose';
import *as bodyParser from 'body-parser';
import { Routes } from './Startup/Routes';
import { DB } from './Startup/DB';

class testApp{

    public app:express.Application = express();
    public constructor(){

        this.app.listen(3000,'localhost',()=>{

            console.log("Server Started.");

        });
        this.configBodyParser();
        Routes.configRoutes(this.app);
        //Routes.ConfigRoutes(this.app);
        DB.ConnectDB();

    }

    private configBodyParser(){

        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended:true}));

    }

}

let o1 = new testApp();