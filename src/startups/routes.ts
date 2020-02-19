import * as express from "express";
import { todoApp } from "../routers/todoApp";
import { questionApp } from "../routers/questionApp";
import { dummyApp } from "../routers/dummyApp";
import { testApp } from "../routers/testApp";
import { userApp } from "../routers/userApp";
import { Authenticate } from "../middlewares/authenticate";
import { Authorize } from "../middlewares/authorize";
import { S3Service } from "../utils/s3Service";
import * as fileUpload from "express-fileupload";

export class Routes {
  public static registerRoutes(app: express.Application): void {
    // default options
    app.use(fileUpload());

    app.use('/user', userApp);
    app.use('/todo', Authenticate.auth,todoApp);
    app.use('/questions', [Authenticate.auth, Authorize.authorize], questionApp);
    app.use('/api/Test', dummyApp);
    app.use('/tests', testApp);

    app.use('/upload', S3Service.upload);
  }
}


/*
express.Router
Use the express.Router class to create modular, mountable route handlers. A Router instance is a complete middleware
and routing system; for this reason, it is often referred to as a “mini-app”.

The following example creates a router as a module, loads a middleware function in it, defines some routes, and mounts
the router module on a path in the main app.

Create a router file named birds.js in the app directory, with the following content:

var express = require('express')
var router = express.Router()

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})
// define the home page route
router.get('/', function (req, res) {
  res.send('Birds home page')
})
// define the about route
router.get('/about', function (req, res) {
  res.send('About birds')
})

module.exports = router
Then, load the router module in the app:

var birds = require('./birds')

// ...

app.use('/birds', birds)

*/