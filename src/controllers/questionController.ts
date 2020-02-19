import  * as express from "express";
import { QuestionService } from "../services/questionService";

export class QuestionController{
    public static async create(req: express.Request, res: express.Response) {
        let response = await QuestionService.create(req);
        return res.send(response);
    }

    public static async get(req: express.Request, res: express.Response) {
        let response = await QuestionService.get(req);
        return res.send(response);
    }

    public static async getAll(req: express.Request, res: express.Response) {
        let response = await QuestionService.getAll(req);
        return res.send(response);
    }

    public static async update(req: express.Request, res: express.Response) {
        let response = await QuestionService.update(req);
        return res.send(response);
    }

    public static async remove(req: express.Request, res: express.Response) {
        let response = await QuestionService.remove(req);
        return res.send(response);
    }

        /*
        Response methods
        The methods on the response object (res) in the following table can send a response to the client, and terminate 
        the request-response cycle. If none of these methods are called from a route handler, the client request will be 
        left hanging.

        Method	Description
        res.download()	Prompt a file to be downloaded.
        res.end()	End the response process.
        res.json()	Send a JSON response.
        res.jsonp()	Send a JSON response with JSONP support.
        res.redirect()	Redirect a request.
        res.render()	Render a view template.
        res.send()	Send a response of various types.
        res.sendFile()	Send a file as an octet stream.
        res.sendStatus()	Set the response status code and send its string representation as the response body.

        */
}