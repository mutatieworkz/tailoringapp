import { Injectable, NgZone } from '@angular/core';
import { NavController, ToastController, ActionSheetController, Platform, LoadingController, ModalController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';

import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';

declare var cordova: any;

@Injectable()
export class ImageProcessProvider {
    profileImg: any;
    constructor(private databaseProvider: DatabaseProvider,
        private camera: Camera,
        private file: File,
        private filePath: FilePath,
        public toastCtrl: ToastController,
        public platform: Platform,
        private zone: NgZone) {
    }

    public setProfileImg() {
        return this.file.checkFile(cordova.file.dataDirectory, this.createFileName())
            .then(data => {
                if (data) {
                    this.profileImg = this.pathForImage(this.createFileName() + '?' + new Date().getTime());
                }
                else {
                    this.profileImg = this.databaseProvider.User[0].Gender == 'Male' ? 'assets/Male.png' : 'assets/Female.png';
                }
                return this.profileImg;
            }, err => {
                console.log(err);
                this.profileImg = this.databaseProvider.User[0].Gender == 'Male' ? 'assets/Male.png' : 'assets/Female.png';
                return this.profileImg;
            });
    }

    public takePicture(sourceType): Promise<any> {
        // Create options for the Camera Dialog
        var options = {
            quality: 100,
            allowEdit: true,
            sourceType: sourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true
        };

        // Get the data of an image
        return this.camera.getPicture(options).then((imagePath) => {
            // Special handling for Android library
            if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
                return this.filePath.resolveNativePath(imagePath)
                    .then(filePath => {
                        let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                        let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                        return this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
                    });
            } else {
                var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
                var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
                return this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
            }
        }, (err) => {
            this.presentToast('Error while selecting image.');
        });
    }

    /** Create a new name for the image
    * @returns {string} The File name 
    */
    public createFileName() {
        return this.databaseProvider.User[0].Username + ".jpg";
    }

    /** 
     * Copy the image to a local folder
     * 
     * @param {string} namePath Base FileSystem. Please refer to the iOS and Android filesystems
     * @param {string} currentName Name of file to copy
     * @param {string} newFileName New name of file to copy to
    */
    private copyFileToLocalDir(namePath, currentName, newFileName) {
        console.log(newFileName + ' ' + currentName + ' ' + namePath + ' ' + cordova.file.dataDirectory)
        return this.file.checkFile(cordova.file.dataDirectory, this.createFileName())
            .then(data => {
                if (data) {
                    console.log('File found');
                    return this.file.removeFile(cordova.file.dataDirectory, this.createFileName())
                        .then(() => {
                            console.log("file removed")
                            return this.copyFile(namePath, currentName, newFileName);
                        });
                }
                else {
                    return this.copyFile(namePath, currentName, newFileName);
                }
            }, err => {
                return this.copyFile(namePath, currentName, newFileName);
            });
    }

    private copyFile(namePath: any, currentName: any, newFileName: any) {
        return this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
            this.zone.run(() => {
                this.profileImg = this.pathForImage(this.createFileName() + '?' + new Date().getTime());
            });
            let dirctory = namePath.substring(0, namePath.slice(0, namePath.length - 1).lastIndexOf('/')) + '/';
            this.file.removeRecursively(dirctory, 'cache')
                .then(data => {
                    console.log("Deleted");
                }, err => { console.log(err); })
            console.log('Created ' + this.profileImg);
            return this.profileImg;
        }, error => {
            this.presentToast('Error while storing file.');
        });
    }

    private presentToast(text) {
        let toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    }

    // Always get the accurate path to your apps folder
    public pathForImage(img) {
        if (img === null) {
            return '';
        } else {
            return cordova.file.dataDirectory + img;
        }
    }
}