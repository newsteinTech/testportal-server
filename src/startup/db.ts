import mongoose from "mongoose"

export class DB {

    public static connectdB(){
        let dbUrl:string = "mongodb://localhost:27017/testPortal"
        mongoose.connect(dbUrl,{useNewUrlParser:true})
        .then(()=>{
            console.log("DB Connected")
        }).catch((err:any)=>{
            console.log("DB Connection Failed")
        })
        
    }
}