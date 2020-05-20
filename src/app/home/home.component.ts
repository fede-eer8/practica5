import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { RouterExtensions } from "nativescript-angular/router";
import * as firebase from "nativescript-plugin-firebase";

@Component({
    selector: "Home",
    templateUrl: "/home.component.html",
    styleUrls:["home.component.css"]
})
export class HomeComponent implements OnInit {
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
        //     //console.dir(user);
        //     this.user.userToken = user.email;
        //     this.user.displayName = user.displayName;
        //     this.user.photo = user.photoURL;
        //     this.isLogued = true;
        // })    
        // .catch(error => console.log("Trouble in paradise: " + error));
    }

    logout(): void {
        firebase.logout();
        // GoogleLogin.logout(() => {
        //     console.log("Log out of Social accounts");
        // });
        this.user.userToken = "user@mail.com";
        this.user.displayName = "UserName";
        this.user.photo = "";
        this.isLogued = false;
        this._routerExtensions.navigate(['../home'], {
            transition: {
                name: "fade"
            }
        });
    }

    login(): void {
    firebase.login({
        type: firebase.LoginType.GOOGLE,
        // Optional 
        googleOptions: {
        //   hostedDomain: "mygsuitedomain.com",
        //   // NOTE: no need to add 'profile' nor 'email', because they are always provided
        //   // NOTE 2: requesting scopes means you may access those properties, but they are not automatically fetched by the plugin
        //   scopes: ['https://www.googleapis.com/auth/user.birthday.read']
        }
        }).then(
            function (result) {
            JSON.stringify(result);
            console.log(result);                
            },
            function (errorMessage) {
            console.log(errorMessage);
            }
        );
        firebase.getCurrentUser()
        .then(user => {
            console.dir(user);
            this.user.userToken = user.email;
            this.user.displayName = user.displayName;
            this.user.photo = user.photoURL;
            this.isLogued = true;
        })    
        .catch(error => console.log("Trouble in paradise: " + error));
        
    }

    // get nombres(): string {
    //     return this.nombre;
    // }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    public onBack() {
        this._routerExtensions.back();
        
	}
}