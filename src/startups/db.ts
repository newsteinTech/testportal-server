
import * as mongoose from "mongoose";

export class Db {
    private static mongoUrl: string = "db connection string";

    public  static mongoSetup(){
        mongoose.connect(this.mongoUrl)
        .then(() => {
            console.log("connection successful");
        })
        .catch(error => {
            console.log(error);
            console.log("connection failed");
        });
    }
}