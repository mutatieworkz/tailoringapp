import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { DatabaseProvider } from './../../providers/database/database';

@Component({
    selector: 'page-measurement',
    templateUrl: 'measurementDetails.html'
})

export class MeasurementDetailsPage {
    order: any;
    measurement: any;
    measurementDetails = [];
    loadingCtrl: any;
    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private databaseProvider: DatabaseProvider,
        private toastCtrl: ToastController,
        private loading: LoadingController,
        private alertCtrl: AlertController) {
        this.order = navParams.data.param.order;
        this.measurement = navParams.data.param.measurement;
        this.loadingCtrl = this.loading.create({
            content: 'Please wait...'
        })
    }

    ionViewDidEnter() {
        this.loadMeasurement();
    }

    loadMeasurement() {
        this.databaseProvider.getMeasurementDetails(this.order.Id, this.measurement.TypeId)
            .then(data => {
                this.measurementDetails = data;
            });
    }

    deleteMeasurement() {
        let alert = this.alertCtrl.create({
            title: 'Delete Measurement',
            message: 'Are you sure you want to delete this measurements?',
            buttons: [
                {
                    text: 'No',
                    role: 'cancel',
                    handler: () => {

                    }
                },
                {
                    text: 'Yes',
                    handler: () => {
                        this.loadingCtrl.present();
                        let len = this.measurementDetails.length - 1;
                        this.measurementDetails.forEach((value, index) => {
                            this.databaseProvider.deleteMeasurements(value.Id)
                                .then(data => {
                                    if (index == len) {
                                        this.loadingCtrl.dismiss();
                                        this.presentToast("Measurement deleted successfully");
                                    }
                                });
                        });
                    }
                }
            ]
        });
        alert.present();
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