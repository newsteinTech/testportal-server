import * as express from "express";
import * as compression from "compression";
import * as bodyParser from "body-parser";
import { Routes } from "./startups/routes";
import { ApiLogger } from "./middlewares/apiLogger";
import { Cors } from "./startups/cors";
import { Db } from "./startups/db";
// import * as mongoClient from "mongoose";
// import {Database} from "./startup/db";

class DemoApp {
    public app: express.Application;
    public constructor() {
        //Express Application instance Creation
        this.app = express();

        this.app.use(compression());

        this.configBodyParser();

        //enable core
        Cors.enableCores(this.app);
        this.registerMiddleWares();


        Routes.registerRoutes(this.app);
        Db.mongoSetup();

        this.app.listen(8000, function () {
            console.log("Listening to localhost port 8000");
        });
    }

    private configBodyParser() {
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
    }

    private registerMiddleWares() {
        this.app.use(ApiLogger.LoggerMiddleware);
    }
}

const demoApp = new DemoApp();

/*
This example shows a middleware function mounted on the /user/:id path. The function is executed for any type of HTTP
request on the /user/:id path.

app.use('/user/:id', function (req, res, next) {
  console.log('Request Type:', req.method)
  next()
})

This example shows a route and its handler function (middleware system). The function handles GET requests to
the /user/:id path.

app.get('/user/:id', function (req, res, next) {
  res.send('USER')
})
*/