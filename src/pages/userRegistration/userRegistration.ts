import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { DatabaseProvider } from './../../providers/database/database';


@Component({
    selector: 'page-userregistration',
    templateUrl: 'userRegistration.html'
})

export class UserRegistrationPage {
    questions = [];
    selectedQuestion: any;

    txtUsername: string;
    txtPassword: string;
    txtPhone: string;
    txtEmail: string;
    dtBirthday: Date;
    gender: string;
    txtAnswer: string;
    questionId: any = 0;

    isSuccess: boolean = false;
    isUserExists: boolean = false;
    isUserNotExists: boolean = false;
    username: any;

    constructor(public navCtrl: NavController,
        private databaseProvider: DatabaseProvider,
        private toastCtrl: ToastController) {
        this.databaseProvider.getQuestions().then(data => {
            this.questions = data;
        });

    }

    Submit() {
        this.databaseProvider.userRegistration(this.txtUsername, this.txtPassword, this.txtPhone, this.txtEmail, this.dtBirthday,
            this.gender, this.questionId, this.txtAnswer)
            .then(data => {
                this.isSuccess = true;
                this.presentToast('Registration successfully. Please login');
                this.txtUsername = this.txtPassword = this.txtPhone = this.txtEmail = this.txtAnswer = null;
                this.selectedQuestion = null;
                this.gender = null;
                this.dtBirthday = new Date();
            }, err => {
                this.isSuccess = false;
                this.presentToast('Registration Failed');
            });
    }

    onChangeQuestion(selectedQuestion) {
        if (selectedQuestion != null)
            this.questionId = selectedQuestion.QuestionId;
    }
    onChangeGender(selectedValue) {
        this.gender = selectedValue;
    }

    onBlur() {
        if (this.username != this.txtUsername) {
            this.databaseProvider.checkUserExists(this.txtUsername.trim().toLocaleLowerCase())
                .then(data => {
                    this.username = this.txtUsername;
                    if (data) {
                        this.isUserNotExists = true;
                        this.isUserExists = false;
                    }
                    else {
                        this.isUserNotExists = false;
                        this.isUserExists = true;
                    }
                }, err => {
                    this.isSuccess = false;
                    this.presentToast('Error');
                });
        }
    }

    presentToast(content: string) {
        const toast = this.toastCtrl.create({
            message: content,
            duration: 3000,
            position: 'middle'
        });
        toast.onDidDismiss(() => {
            if (this.isSuccess)
                this.navCtrl.pop();
        });
        toast.present();
    }
}