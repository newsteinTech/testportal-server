import * as express from 'express';
import { TodoService } from '../services/todoService';

export class TodoController {
    public static async create(req: express.Request, res: express.Response) {
        let response = await TodoService.AddTodo(req);
        return res.send(response);
    }

    public static async get(req: express.Request, res: express.Response) {
        let response = await TodoService.get(req);
        return res.send(response);
    }

    public static async getAll(req: express.Request, res: express.Response) {
        let response = await TodoService.getAll(req);
        return res.send(response);
    }

    public static async update(req: express.Request, res: express.Response) {
        let response = await TodoService.update(req);
        return res.send(response);
    }

    public static async remove(req: express.Request, res: express.Response) {
        let response = await TodoService.remove(req);
        return res.send(response);
    }

    public static async dummy(req: express.Request, res: express.Response) {
        let response = await TodoService.dummy(req);
        return res.send(response);
    }
}
