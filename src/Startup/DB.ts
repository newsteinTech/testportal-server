import mongoose from 'mongoose'
export class DB{

    public static ConnectDB(){
        let connectString:string = 'mongodb://localhost:27017/book';
        mongoose.connect(connectString).then((data:any)=>{
            console.log('Db Connect');
        }).catch((err:any)=>{
            console.log(err);
            console.log('Connection failed');
        })
    }

}