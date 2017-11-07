//

import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, ViewController, LoadingController } from 'ionic-angular';
import { DatabaseProvider } from './../../providers/database/database';

/**
 * Generated class for the AddCustomerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-edit-customer',
    templateUrl: './../../pages/measurement/measurement.html'
})

export class EditMeasurementPage {
    measurements;
    txtQty: any;
    closeVisible = true;
    typeVisible = false;
    valueTypes = [];
    loadingCtrl: any;
    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private databaseProvider: DatabaseProvider,
        private toastCtrl: ToastController,
        private loading: LoadingController,
        public viewCtrl: ViewController) {
        this.txtQty = navParams.data.qty;
        this.measurements = navParams.data.measurements;
        this.databaseProvider.getMeasurementValueType().then(data => {
            this.valueTypes = data;
        })
        this.loadingCtrl = this.loading.create({
            content: 'Please wait...'
        })
    }

    Submit() {
        this.loadingCtrl.present();
        let len = this.measurements.length - 1;
        this.measurements.forEach((value, index) => {
            value.Qty = this.txtQty;
            this.databaseProvider.updateMeasurement(value).then(data => {
                if (index == len) {
                    this.loadingCtrl.dismiss();
                    this.presentToast("measurement updated successfully");
                }
            });
        });

    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    presentToast(content: string) {
        const toast = this.toastCtrl.create({
            message: content,
            duration: 1000,
            position: 'middle'
        });
        toast.onDidDismiss(() => {
            this.navCtrl.pop();
        });
        toast.present();
    }
}