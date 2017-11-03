import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { DatabaseProvider } from './../../providers/database/database';

@Component({
    selector: 'add-edit-measurement-name',
    templateUrl: 'addEditMeasurementName.html'
})

export class AddEditMeasurementNamePage {
    txtName: string;
    measurementName: any;
    measurementTypes = [];
    selectedType: any;
    isSave: boolean = false;
    title: string = "Add Measurement Name";

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private databaseProvider: DatabaseProvider,
        private toastCtrl: ToastController,
        public viewCtrl: ViewController) {
        this.measurementName = this.navParams.get('name');
        this.databaseProvider.getMeasurementType().then(data => {
            this.measurementTypes = data;
        });

        if (this.measurementName != undefined) {
            this.txtName = this.measurementName.Name;
            this.databaseProvider.getMeasurementTypeById(this.measurementName.TypeID).then(data => {
                if (data.length > 0)
                    this.selectedType = this.measurementTypes.filter(x => x.Id == data[0].Id)[0];
                    console.log(this.selectedType);
            });
            this.isSave = false;
            this.title = "Edit Measurement Name";
        } else {
            this.isSave = true;
            this.title = "Add Measurement Name";
        }

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AddEditMeasurementNamePage');
    }

    // onChange(selectedValue) {
    //     this.selectedType = selectedValue;
    // }

    Submit() {
        if (this.isSave) {
            this.databaseProvider.addMeasurementName(this.txtName, this.selectedType.Id).then(data => {
                this.txtName = '';
                this.selectedType = null;
                this.presentToast(this.txtName + " added successfully");
            })
        }
        else {
            this.databaseProvider.UpdateMeasurementName(this.txtName, this.selectedType.Id, this.measurementName.Id).then(data => {
                this.txtName = '';
                this.selectedType = null;
                this.presentToast('Updated successfully');
            });
        }
    }

    presentToast(content: string) {
        const toast = this.toastCtrl.create({
            message: content,
            duration: 2000,
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
