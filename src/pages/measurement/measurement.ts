import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { DatabaseProvider } from './../../providers/database/database';

@Component({
    selector: 'page-measurement',
    templateUrl: 'measurement.html'
})

export class MeasurementPage {
    valueTypes = [];
    measurementTypes = [];
    selectedType: any;
    measurements = [];
    customerId: any;
    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private databaseProvider: DatabaseProvider,
        private toastCtrl: ToastController) {
        this.customerId = this.navParams.get('customerID');
        this.databaseProvider.getMeasurementType().then(data => {
            this.measurementTypes = data;
        });
        this.databaseProvider.getMeasurementValueType().then(data => {
            this.valueTypes = data;
        })
    }

    onChange(selectedValue) {
        this.measurements = [];
        this.databaseProvider.getMeasurementNameDetailsByTypeId(selectedValue.Id)
            .then(data => {
                this.measurements = data;
            }, err => {
                console.log(err);
            });
    }

    Submit() {
        if (this.databaseProvider.addMeasurements(this.customerId, this.measurements)) {
            this.presentToast("measurement added successfully");
        }
    }

    presentToast(content: string) {
        const toast = this.toastCtrl.create({
            message: content,
            duration: 2000,
            position: 'middle'
        });
        toast.onDidDismiss(() => {
            this.navCtrl.pop();
        });
        toast.present();

    }
}