import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { DatabaseProvider } from './../../providers/database/database';


@Component({
    selector: 'page-editProfile',
    templateUrl: 'editProfile.html'
})

export class EditProfilePage {
    txtPhone: string;
    txtEmail: string;
    dtBirthday: Date;
    gender: string;
    user: any;

    isSuccess: boolean = false;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private databaseProvider: DatabaseProvider,
        private toastCtrl: ToastController,
        public viewCtrl: ViewController) {
        this.user = this.navParams.get('user');
        this.txtPhone = this.user.Phone;
        this.txtEmail = this.user.Email;
        this.gender = this.user.Gender;
        this.dtBirthday = this.user.DOB;
    }

    onChangeGender(selectedValue) {
        this.gender = selectedValue;
    }

    Submit() {
        this.databaseProvider.updateUser(this.txtPhone, this.txtEmail, this.dtBirthday,
            this.gender, this.user.UserId)
            .then(data => {
                if (data) {
                    this.isSuccess = true;
                    this.presentToast('User update successfully');
                    this.txtPhone = this.txtEmail = null;
                    this.gender = null;
                    this.dtBirthday = new Date();
                }
                else {
                    this.isSuccess = false;
                    this.presentToast('Update Failed');
                }
            }, err => {
                this.isSuccess = false;
                this.presentToast('Update Failed');
            });
    }
    dismiss() {
        this.viewCtrl.dismiss(this.isSuccess);
    }
    presentToast(content: string) {
        const toast = this.toastCtrl.create({
            message: content,
            duration: 3000,
            position: 'middle'
        });
        toast.onDidDismiss(() => {
            if (this.isSuccess)
                this.viewCtrl.dismiss(this.isSuccess);
        });
        toast.present();
    }
}