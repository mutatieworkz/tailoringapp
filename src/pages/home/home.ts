import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { DatabaseProvider } from './../../providers/database/database';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  txtUsername: string;
  txtPassword: string;
  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public databaseProvider: DatabaseProvider) {

  }

  SignIn() {
    if (this.txtUsername == undefined || this.txtUsername.trim() == '') {
      this.presentToast("Please enter username");
      return;
    }
    if (this.txtPassword == undefined || this.txtPassword.trim() == '') {
      this.presentToast("Please enter password");
      return;
    }

    if (this.txtUsername.toLowerCase() == "admin" && this.txtPassword.toLocaleLowerCase() == "admin") {
      this.navCtrl.setRoot(DashboardPage).then(() => {
        console.log("done");
      });
    }
    else {
      this.presentToast("Login failed");
    }
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
