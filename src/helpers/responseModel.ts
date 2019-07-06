export class ResponseModel {
    isValid : boolean;
    data : any;
    error : any

    constructor(isValid:boolean,data:any,error:any)
    {
        this.isValid = isValid
        this.data = data
        this.error = error
    }

    public static getValidResponse(data:any){
        return new ResponseModel(true,data,null)
    }

    public static getInValidResponse(error:any){
        return new ResponseModel(true,null,error)
    }

}