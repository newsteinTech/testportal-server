import *as express from 'express';
import { userRoutes } from '../Routes/userRoutes';
import { testRoutes } from '../Routes/testRoutes';
import { Authanticate } from '../Middleware/authantication';


export class Routes{

    public static configRoutes(app:express.Application){

        app.get('/',(req:any,res:any)=>{
            res.send("Server Running");
        })
    
        app.use('/api/user',userRoutes);
        app.use('/api/test',Authanticate.Authanticate,testRoutes);
    }
    

}