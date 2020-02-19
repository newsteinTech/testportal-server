import * as express from 'express';

export class ApiLogger {
    public static LoggerMiddleware(req: express.Request, res: express.Response, next: any) : void {
        console.log(req.url);
        console.log(req.params);
        // console.log(req.body);
        console.log('Server Request Time: ', Date.now())
        next();

        console.log('Server Response Time: ', Date.now())
        console.log(res.statusCode);

    }
}


/* 
Error-handling middleware
Error-handling middleware always takes four arguments. You must provide four arguments to identify it as an error-handling middleware function. Even if you don’t need to use the next object, you must specify it to maintain the signature. Otherwise, the next object will be interpreted as regular middleware and will fail to handle errors.

Define error-handling middleware functions in the same way as other middleware functions, except with four arguments instead of three, specifically with the signature (err, req, res, next)):

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
 
*/