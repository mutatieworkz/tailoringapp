import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { UserRegistrationPage } from '../user/userRegistration/userRegistration';
import { DashboardPage } from '../dashboard/dashboard';
import { ForgotPasswordPage } from '../user/forgotPassword/forgotPassword';
import { DatabaseProvider } from './../../providers/database/database';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  txtUsername: string;
  txtPassword: string;
  isForgotPasswordEnabled: boolean = false;
  constructor(public navCtrl: NavController,
    public toastCtrl: ToastController,
    public databaseProvider: DatabaseProvider
  ) {

  }

  // ionViewDidLoad() {
  //   this.databaseProvider.openSQLiteDatabase()
  //     .then(data => {
  //       this.databaseProvider.checkLoggedInUser()
  //         .then(data => {
  //           if (data.length > 0) {
  //             this.databaseProvider.User = data;
  //             this.navCtrl.setRoot(DashboardPage);
  //           }
  //         }, err => {
  //           console.log(err);
  //         });
  //     })
  // }

  SignIn() {
    if (this.txtUsername == undefined || this.txtUsername.trim() == '') {
      this.presentToast("Please enter username");
      return;
    }
    if (this.txtPassword == undefined || this.txtPassword.trim() == '') {
      this.presentToast("Please enter password");
      return;
    }

    this.databaseProvider.login(this.txtUsername.toLowerCase(), this.txtPassword.toLocaleLowerCase())
      .then(data => {
        if (data.length > 0) {
          this.navCtrl.setRoot(DashboardPage).then(() => {
            console.log("done");
          });
        }
        else {
          this.presentToast("Login failed");
          this.isForgotPasswordEnabled = true;
        }
      }, err => {
        this.presentToast("Login failed");
        console.log('Error: ', err);
      });
  }

  userRegistration() {
    this.navCtrl.push(UserRegistrationPage);
  }

  forgotPassword() {
    this.navCtrl.push(ForgotPasswordPage, { param: { customer: this.txtUsername } });
  }

  presentToast(content: string) {
    const toast = this.toastCtrl.create({
      message: content,
      duration: 3000,
      position: 'middle'
    });
    toast.present();
  }



}
