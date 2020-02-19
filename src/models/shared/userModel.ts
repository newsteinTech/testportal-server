export class UserModel {
    public mobile: string;
    public password: string;

    constructor(data) {
        this.mobile = data.mobile;
        this.password = data.password;
    }
}