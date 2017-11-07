import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { DatabaseProvider } from './../../providers/database/database';

@Component({
    selector: 'page-measurement',
    templateUrl: 'measurement.html'
})

export class MeasurementPage {
    customer: any;
    order: any;
    valueTypes = [];
    measurementTypes = [];
    selectedType: any;
    measurements = [];
    customerId: any;
    txtQty = 1;
    loadingCtrl: any;
    closeVisible = false;
    typeVisible = true;
    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private databaseProvider: DatabaseProvider,
        private toastCtrl: ToastController,
        private loading: LoadingController,
        private alertCtrl: AlertController) {
        this.customer = this.navParams.data.param.customer;
        this.order = this.navParams.data.param.order;
        this.databaseProvider.getMeasurementType().then(data => {
            this.measurementTypes = data;
        });
        this.databaseProvider.getMeasurementValueType().then(data => {
            this.valueTypes = data;
        })
        this.loadingCtrl = this.loading.create({
            content: 'Please wait...'
        })
    }

    onChange(selectedValue) {
        this.measurements = [];
        this.databaseProvider.checkMeasurementAvaiableByTypeForOrder(selectedValue.Id, this.order.Id)
            .then(data => {
                if (!data) {
                    this.databaseProvider.getMeasurementNameDetailsByTypeId(selectedValue.Id)
                        .then(data => {
                            this.measurements = data;
                        }, err => {
                            console.log(err);
                        });
                }
                else {
                    let alert = this.alertCtrl.create({
                        title: 'Already Added',
                        message: selectedValue.Name + ' measurement already added',
                        buttons: [
                            {
                                text: 'Cancel',
                                role: 'cancel',
                                handler: () => {
                                    this.navCtrl.pop();
                                }
                            },
                            {
                                text: 'Ok',
                                handler: () => {
                                }
                            }
                        ]
                    });
                    alert.present();
                }
            });

    }

    Submit() {
        this.loadingCtrl.present();
        this.databaseProvider.getMeasurementSequenceNo(this.order.Id)
            .then(data => {
                let len = this.measurements.length - 1;
                this.measurements.forEach((value, index) => {
                    value.Qty = this.txtQty;
                    value.Sequence_No = data + 1;
                    this.databaseProvider.addMeasurements(this.order.Id, value).then(data => {
                        if (index == len) {
                            this.loadingCtrl.dismiss();
                            this.presentToast("measurement added successfully");
                        }
                    });
                });
            })
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