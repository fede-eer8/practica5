export class User {
    //authToken?: string;
    //authCode?: string;
    //code: LoginResultType;
    displayName?: string;
    //firstName?: string;
    //lastName?: string;
    //error?: any;
    id?: string;
    photo?: string;
    //provider?: string;
    userToken?: string;
    

    constructor(options: any) {
        this.id = options.id;
        this.displayName = options.displayName;
        this.userToken = options.userToken;
        this.photo = options.photo;
        
    }
}