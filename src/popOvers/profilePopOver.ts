import { Component } from '@angular/core';
import { App, ViewController, AlertController, ToastController } from 'ionic-angular';
import { DatabaseProvider } from '../providers/database/database';
import { ProfilePage } from '../pages/user/profile/profile';
import { HomePage } from '../pages/home/home';
import { delay } from 'rxjs/operators/delay';

@Component({
    template: `
      <ion-list>
        <button ion-item (click)="profile_Click()">
        <ion-icon name="md-contact"></ion-icon>&nbsp;&nbsp;&nbsp;Profile
        </button>
        <button ion-item (click)="presentChangePasswordPrompt()">
        <ion-icon name="md-create"></ion-icon>&nbsp;&nbsp;&nbsp;Change Password
        </button>
        <button ion-item (click)="logout_Click()">
        <ion-icon name="md-log-out"></ion-icon>&nbsp;&nbsp;&nbsp;Logout
        </button>
      </ion-list>
    `
})
export class ProfilePopoverPage {
    userName: string;
    constructor(
        public databaseProvider: DatabaseProvider,
        public viewCtrl: ViewController,
        public app: App,
        public toastCtrl: ToastController,
        private alertCtrl: AlertController) {
        this.userName = this.databaseProvider.User[0].Username;
    }

    profile_Click() {
        this.viewCtrl.dismiss();
        this.app.getRootNav().push(ProfilePage);
    }

    logout_Click() {
        this.databaseProvider.updateIsLogin(this.databaseProvider.User[0].UserId, false)
            .then(data => {
                this.app.getRootNav().setRoot(HomePage).then(() => { this.viewCtrl.dismiss(); });
            }, err => {
                console.log(err);
            });
    }


    presentToast(content: string) {
        const toast = this.toastCtrl.create({
            message: content,
            duration: 3000,
            position: 'middle'
        });
        toast.present();
    }

    presentChangePasswordPrompt() {
        this.viewCtrl.dismiss();
        let alert = this.alertCtrl.create({
            title: 'Change Password',
            inputs: [
                {
                    name: 'currentpassword',
                    placeholder: 'Current password',
                    type: 'password'
                },
                {
                    name: 'password',
                    placeholder: 'New password',
                    type: 'password'
                },
                {
                    name: 'confirmPassword',
                    placeholder: 'Confirm Password',
                    type: 'password'
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Change',
                    handler: data => {
                        if (data.currentpassword == this.databaseProvider.User[0].Password) {
                            if (data.password == data.confirmPassword) {
                                this.databaseProvider.updatePassword(this.databaseProvider.User[0].UserId, data.confirmPassword)
                                    .then(data => {
                                        this.presentToast('Password updated successfully');
                                        delay(3500);
                                        this.logout_Click();
                                    }, err => {
                                        this.presentToast('Updated failed');
                                    })
                            }
                            else {
                                this.presentToast('Password and confirm password did not match');
                            }
                        }
                        else {
                            this.presentToast('Current password is not valid');
                        }
                    }
                }
            ]
        });
        alert.present();
    }
}