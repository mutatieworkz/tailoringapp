import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { DatabaseProvider } from './../../../providers/database/database';


@Component({
    selector: 'page-forgotPassword',
    templateUrl: 'forgotPassword.html'
})

export class ForgotPasswordPage {
    question: any = {};
    selectedQuestion: any;

    txtUsername: string;
    txtPassword: string;
    txtConfirmPassword: string;
    txtAnswer: string = "";
    questionId: any = 0;

    isQuestionVisible: boolean = false;
    isPasswordVisible: boolean = false;
    isButtonDisabled: boolean = false;

    constructor(public navctrl: NavController,
        private navParams: NavParams,
        private databaseProvider: DatabaseProvider,
        public toastCtrl: ToastController) {
        this.txtUsername = this.navParams.data.param.customer;

    }

    onSubmit() {
        if (!this.isQuestionVisible && this.txtAnswer == "") {
            this.databaseProvider.getSecurityQuestionByUser(this.txtUsername.toLowerCase()).then(data => {
                this.question = data[0];
                this.isQuestionVisible = true;
                this.isButtonDisabled = true;
            });
            return;
        }
        if (this.isQuestionVisible) {
            if (this.question.Answer == this.txtAnswer.toLowerCase()) {
                this.isPasswordVisible = true;
                this.isButtonDisabled = true;
            }
            else {
                this.presentToast('Your answer is wrong');
                return;
            }
        }

        if (this.isPasswordVisible
            && (this.txtPassword != undefined && this.txtConfirmPassword != undefined)) {
            if (this.txtPassword == this.txtConfirmPassword) {
                this.databaseProvider.updatePassword(this.question.UserId, this.txtConfirmPassword)
                    .then(data => {
                        this.presentToast('Password updated successfully');
                        this.navctrl.pop();
                    }, err => {
                        this.presentToast('Updated failed');
                    })
            }
            else {
                this.presentToast('Password and Confirm password did not match');
            }
        }
    }

    answerChange(ev: any) {
        let val = ev.target.value;
        if (val.length > 0) {
            this.isButtonDisabled = false;
        }
    }

    passwordChange(ev: any) {
        let val = ev.target.value;
        if (val.length > 0 && this.txtPassword.length > 0) {
            this.isButtonDisabled = false;
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