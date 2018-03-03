import { Component, NgZone } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NavController, ToastController, ActionSheetController, LoadingController, ModalController } from 'ionic-angular';
import { DatabaseProvider } from './../../../providers/database/database';
import { ImageProcessProvider } from './../../../providers/imageProcess/imageProcess';
import { EditProfilePage } from './../../../modals/editProfile/editProfile';

import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';



declare var cordova: any;

@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html'
})

export class ProfilePage {
    profileImg: any;
    profile: any;

    constructor(private databaseProvider: DatabaseProvider,
        private imgProcess: ImageProcessProvider,
        public navCtrl: NavController,
        public actionSheetCtrl: ActionSheetController,
        private camera: Camera,
        private file: File,
        public dom: DomSanitizer,
        public toastCtrl: ToastController,
        public loadingCtrl: LoadingController,
        public modalCtrl: ModalController) {
        this.setProfileImg();
        this.profile = this.databaseProvider.User[0];
    }

    private setProfileImg() {
        this.imgProcess.setProfileImg()
            .then(data => {
                this.profileImg = data;
            })
    }


    public presentActionSheet() {
        let actionSheet = this.actionSheetCtrl.create({
            title: 'Select Image Source',
            buttons: [
                {
                    text: 'Load from Library',
                    handler: () => {
                        this.imgProcess.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY)
                            .then(data => {
                                this.profileImg = this.imgProcess.profileImg;
                            });
                    }
                },
                {
                    text: 'Use Camera',
                    handler: () => {
                        this.imgProcess.takePicture(this.camera.PictureSourceType.CAMERA)
                            .then(data => {
                                this.profileImg = this.imgProcess.profileImg;
                            });
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel'
                }
            ]
        });
        actionSheet.present();
    }

    private presentToast(text) {
        let toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    }

    loadModal() {
        let modal = this.modalCtrl.create(EditProfilePage, { user: this.profile });
        modal.onDidDismiss(data => {
            if (data) {
                // Call the method to do whatever in your home.ts
                this.databaseProvider.checkLoggedInUser()
                    .then(data => {
                        if (data.length > 0) {
                            this.databaseProvider.User = data;
                            this.profile = data[0];
                        }
                    }, err => {
                        console.log(err);
                    });
            }
            console.log('Modal closed');
        });
        modal.present();
    }
}