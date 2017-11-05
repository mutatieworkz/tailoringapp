import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { DatabaseProvider } from './../../providers/database/database';


@Component({
    selector: 'add-edit-measurement-type',
    templateUrl: 'addEditMeasurementType.html'
})
export class AddEditMeasurementTypePage {
    txtTypeName: string;
    measurementType: any;
    isSave: boolean = false;
    title: string = "Add Measurement Type";
    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private databaseProvider: DatabaseProvider,
        private toastCtrl: ToastController,
        public viewCtrl: ViewController) {
        this.measurementType = this.navParams.get('type');
        if (this.measurementType != undefined) {
            this.txtTypeName = this.measurementType.Name;
            this.isSave = false;
            this.title = "Edit Measurement Type";
        } else {
            this.isSave = true;
            this.title = "Add Measurement Type";
        }
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AddEditMeasurementTypePage');
    }

    Submit() {
        if (this.isSave) {
            this.databaseProvider.addMeasurementType(this.txtTypeName).then(data => {
                this.txtTypeName = '';
                this.presentToast(this.txtTypeName + " added successfully");
            })
        }
        else {
            this.databaseProvider.UpdateMeasurementType(this.txtTypeName, this.measurementType.Id).then(data => {
                this.txtTypeName = '';
                this.presentToast('Updated successfully');
            });
        }
    }

    presentToast(content: string) {
        const toast = this.toastCtrl.create({
            message: content,
            duration: 1000,
            position: 'middle'
        });
        toast.onDidDismiss(() => {
                this.dismiss();
        });
        toast.present();
    }
    
    dismiss() {
        this.viewCtrl.dismiss();
    }
}
