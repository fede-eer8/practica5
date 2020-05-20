import { Component, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs/operators";
import { DrawerTransitionBase, SlideInOnTopTransition, RadSideDrawer } from "nativescript-ui-sidedrawer";
import { RouterExtensions } from "nativescript-angular/router";
import * as app from "tns-core-modules/application";
import { initFirebase } from "./shared/firebase.common";
import { logout } from "nativescript-plugin-firebase";
import * as firebase from "nativescript-plugin-firebase";
import { SelectedIndexChangedEventData, selectedIndexProperty } from "tns-core-modules/ui/tab-view/tab-view";
import { setTimeout } from "tns-core-modules/timer";

@Component({
    selector: "ns-app",
    templateUrl: "./app.component.html",
    providers: []
})
export class AppComponent implements OnInit {
    public isLogued: boolean;
    public user = {
        userToken: "user@mail.com",
        displayName: "UserName",
        photo: null
    }
    public listener = {
        onAuthStateChanged: function(data) {
          console.log(data.loggedIn ? "Logged in to firebase" : "Logged out from firebase");
          if (data.loggedIn) {
            console.log("User info", data.user);
            this.user.userToken = data.user.email;
            this.user.displayName = data.user.displayName;
            this.user.photo = data.user.photoURL;
            
          }
        },
        thisArg: this
      };

    constructor(private router: Router, 
        private routerExtensions: RouterExtensions) {
    }

    ngOnInit() {
        
        initFirebase();
        firebase.getCurrentUser()
            .then(user => {
            //console.dir(user);
            this.isLogued = true;    
            this.checkUser(user);         
            })    
            .catch(error => console.log("Trouble in paradise: " + error));
    }

    onSelectedIndexChanged(args: SelectedIndexChangedEventData) {
        console.log(`Selected index has changed ( Old index: ${args.oldIndex} New index: ${args.newIndex} )`);
        //this.isLogued = !this.isLogued;
        
    }
    
    logout(): void {
        firebase.addAuthStateListener(this.listener);
        firebase.logout();
        // GoogleLogin.logout(() => {
        //     console.log("Log out of Social accounts");
        // });
        this.user.userToken = "user@mail.com";
        this.user.displayName = "UserName";
        this.user.photo = "";
        this.isLogued = false;
        firebase.removeAuthStateListener(this.listener);
    }

    login(): void {
        firebase.addAuthStateListener(this.listener);
        if(this.isLogued) {
            firebase.getCurrentUser()
            .then(user => {
            //console.dir(user);
                this.checkUser(user);
            })    
            .catch(error => console.log("Trouble in paradise: " + error));
            
        } else {
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
                //console.log(result);                
                },
                function (errorMessage) {
                console.log(errorMessage);
                }
            );
            this.isLogued = true;
            firebase.getCurrentUser()
            .then(user => {
            //console.dir(user);
                // this.user.userToken = user.email;
                // this.user.displayName = user.displayName;
                // this.user.photo = user.photoURL;
                // this.isLogued = true;
                this.checkUser(user);
            })    
            .catch(error => console.log("Trouble in paradise: " + error));
            // setTimeout(() => {           
            //     firebase.getCurrentUser()
            //     .then(user => {
            //         //console.dir(user);
            //         this.checkUser(user);
            //     })  
            //     }, 10000);
            //firebase.removeAuthStateListener(this.listener);
            
        }
              
    }

    createUser() {
        firebase.createUser({
            email: 'eddyverbruggen@gmail.com',
            password: 'firebase'
          }).then(
              function (user) {
                  console.log(user)
                // dialogs.alert({
                //   title: "User created",
                //   message: "email: " + user.email,
                //   okButtonText: "Nice!"
                // })
              },
              function (errorMessage) {
                  console.log(errorMessage)
                // dialogs.alert({
                //   title: "No user created",
                //   message: errorMessage,
                //   okButtonText: "OK, got it"
                // })
              }
          );
    } 

    public checkUser(user) {

        if(this.isLogued) {
            this.user.userToken = user.email;
            this.user.displayName = user.displayName;
            this.user.photo = user.photoURL;
        } else {
            this.user.userToken = "user@mail.com";
            this.user.displayName = "UserName";
            this.user.photo = "";
        }
    }

  }
