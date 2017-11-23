import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, ModalController, LoadingController, AlertController } from 'ionic-angular';
import { DatabaseProvider } from './../../providers/database/database';
import { EditMeasurementPage } from './../../modals/editMeasurement/editMeasurement';

@Component({
    selector: 'page-measurement',
    templateUrl: 'measurementDetails.html'
})

export class MeasurementDetailsPage {
    order: any;
    orderType: any;
    measurementDetails = [];
    loadingCtrl: any;
    qty: any;
    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private databaseProvider: DatabaseProvider,
        private toastCtrl: ToastController,
        private loading: LoadingController,
        private alertCtrl: AlertController,
        public modalCtrl: ModalController) {
        this.order = navParams.data.param.order;
        this.orderType = navParams.data.param.OrderType;
        this.loadingCtrl = this.loading.create({
            content: 'Please wait...'
        })
    }

    ionViewDidEnter() {
        this.loadMeasurement();
    }

    loadMeasurement() {
        this.databaseProvider.getMeasurementDetails(this.orderType.Id)
            .then(data => {
                this.measurementDetails = data;
                this.qty = this.orderType.Qty;
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

    editMeasurement() {
        let modal = this.modalCtrl.create(EditMeasurementPage, { measurements: this.measurementDetails, qty: this.qty });
        modal.onDidDismiss(() => {
            // Call the method to do whatever in your home.ts
            this.loadMeasurement();
            console.log('Modal closed');
        });
        modal.present();
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