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
    txtAmount;
    loadingCtrl: any;
    closeVisible = false;
    typeVisible = true;
    dueDate: string = new Date().toISOString();
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
        this.selectedType = selectedValue;
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
        if (this.txtAmount == undefined) {
            this.presentToast("Please enter amount");
            return;
        }
        this.loadingCtrl.present();
        if (this.order.Id == undefined) {
            this.databaseProvider.addOrder(this.customer.Id, this.order.DueDate)
                .then(data => {
                    this.databaseProvider.orderId = data.insertId;
                    this.addOrderType(data.insertId, 1).then(data => {
                    });
                });
        }
        else {
            if (this.order.OrderType == null) {
                this.addOrderType(this.order.Id, 1);
            }
            else {
                this.databaseProvider.getMeasurementSequenceNo(this.order.Id)
                    .then(data => {
                        if (data != null) {
                            this.addOrderType(this.order.Id, data);
                        }
                        // else {
                        //     this.loadingCtrl.dismiss();
                        // }
                    })
            }
        }
    }

    private addOrderType(id, no) {
        return this.databaseProvider.addOrderType(id, this.selectedType.Id, no, this.txtQty, this.txtAmount, this.dueDate)
            .then(data => {
                this.addMeasurements(data.insertId);
            });
    }



    private addMeasurements(id) {
        let len = this.measurements.length - 1;
        this.measurements.forEach((value, index) => {
            this.databaseProvider.addMeasurements(id, value).then(data => {
                if (index == len) {
                    this.loadingCtrl.dismiss();
                    this.presentToast("measurement added successfully");
                }
            });
        });
    }

    changeDueDate(dueDate) {
        this.dueDate = dueDate;
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