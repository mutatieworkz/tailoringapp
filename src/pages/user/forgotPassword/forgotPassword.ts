import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Platform, Navbar, ToastController } from 'ionic-angular';
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

    isUsernameVisible: boolean = true;
    isQuestionVisible: boolean = false;
    isPasswordVisible: boolean = false;
    isButtonDisabled: boolean = false;

    @ViewChild(Navbar) navBar: Navbar;
    constructor(public navctrl: NavController,
        private navParams: NavParams,
        private databaseProvider: DatabaseProvider,
        public toastCtrl: ToastController,
        private platform: Platform) {
        this.txtUsername = this.navParams.data.param.customer;

    }

    ionViewDidLoad() {
        this.navBar.backButtonClick = (e: UIEvent) => {
            // todo something
            this.handleBackButton();
        }
      // var s= this.platform.registerBackButtonAction(() => this.handleBackButton());
    }

    private handleBackButton() {
        if (this.isUsernameVisible) {
            this.navctrl.pop();
        }
        else if (this.isQuestionVisible) {
            this.isQuestionVisible = false;
            this.isUsernameVisible = true;
        }
        else if (this.isPasswordVisible) {
            this.isPasswordVisible = false;
            this.isQuestionVisible = true;
        }
        else {
            this.navctrl.pop();
        }
        //alert("back button pressed");
    }

    onSubmit() {
        if (!this.isQuestionVisible && this.txtAnswer == "") {
            this.databaseProvider.getSecurityQuestionByUser(this.txtUsername.toLowerCase())
                .then(data => {
                    if (data.length > 0) {
                        this.question = data[0];
                        this.isQuestionVisible = true;
                        this.isUsernameVisible = false;
                        this.isButtonDisabled = true;
                    }
                    else {
                        this.presentToast("User does not exists")
                    }
                });
            return;
        }
        if (this.isQuestionVisible) {
            if (this.question.Answer == this.txtAnswer.toLowerCase()) {
                this.isPasswordVisible = true;
                this.isQuestionVisible = false;
                this.isUsernameVisible = false;
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