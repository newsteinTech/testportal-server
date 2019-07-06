export class responseModel{

    isValid: boolean;
    data:any;
    errors:any;
    
    constructor(isValid:boolean,data:any,errors:any){

        this.isValid = isValid;
        this.data = data;
        this.errors = errors;

    }

    public static getValidResponse(data: any){

        return new responseModel(true,data,null);

    }

    public static getInvalidResponse(error:any){

        return new responseModel(false,null,error);

    }
    


}