import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { RouterExtensions } from "nativescript-angular/router";
import * as firebase from "nativescript-plugin-firebase";

@Component({
    selector: "Login",
    templateUrl: "/login.component.html",

})
export class LoginComponent implements OnInit {
    public isLogued = false;
    public user = {
        userToken: "null",
        displayName: "saludar",
        photo: "null"
    }
    constructor(private _routerExtensions: RouterExtensions) {}

    ngOnInit(): void {
        // firebase.getCurrentUser()
        // .then(user => {
        //     console.dir(user);
        //     this.user.userToken = user.email;
        //     this.user.displayName = user.displayName;
        //     this.user.photo = user.photoURL;
        //     this.isLogued = true;
        // })    
        // .catch(error => console.log("Trouble in paradise: " + error));
    }

    // logout(): void {
    //     firebase.logout();
    //     // GoogleLogin.logout(() => {
    //     //     console.log("Log out of Social accounts");
    //     // });
    //     this.isLogued = false;
    // }

    // login(): void {
    //     GoogleLogin.login(result=>{
    //         console.dir(result);
    //         console.log("nombre: "+result.displayName)
    //         //this.result = result;
    //         this.result.userToken = result.userToken;
    //         this.result.displayName = result.displayName;
    //         this.result.photo = result.photo;
    //     });
    //     this.isLogued = true;
    // }

    // get nombres(): string {
    //     return this.nombre;
    // }

    // onDrawerButtonTap(): void {
    //     const sideDrawer = <RadSideDrawer>app.getRootView();
    //     sideDrawer.showDrawer();
    // }

    public onBack() {
        this._routerExtensions.back();
        
	}
}