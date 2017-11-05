import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { DatabaseProvider } from './../../providers/database/database';
import { MeasurementPage } from './../measurement/measurement';
import { MeasurementDetailsPage } from './../measurementDetails/measurementDetails';
import { ChangeOrderStatusPage } from './../../modals/changeOrderStatus/changeOrderStatus';

@Component({
    selector: 'page-order',
    templateUrl: 'order.html'
})

export class OrderPage {
    customer: any;
    order: any;
    measurements = [];
    loadingCtrl: any;
    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private databaseProvider: DatabaseProvider,
        private loading: LoadingController,
        public modalCtrl: ModalController) {
        this.customer = this.navParams.data.param.customer;
        this.order = this.navParams.data.param.order;

    }

    changeStatus() {
        let modal = this.modalCtrl.create(ChangeOrderStatusPage, { param: { order: this.order, customer: this.customer } });
        modal.onDidDismiss(() => {
            // Call the method to do whatever in your home.ts
            this.loadOrderDetails();
            this.loadMeasurements();
            console.log('Modal closed');
        });
        modal.present();
    }

    async ionViewDidEnter() {
        this.loadingCtrl = this.loading.create({
            content: 'Please wait...'
        })
        this.loadingCtrl.present();
        await this.databaseProvider.delay(500);
        this.loadOrderDetails();
        this.loadMeasurements();
    }

    loadOrderDetails() {
        this.databaseProvider.getOrderById(this.order.Id)
            .then(data => {
                this.order = data[0];
            });
    }

    loadMeasurements() {
        this.databaseProvider.getMeasurementsByOrderId(this.order.Id)
            .then(data => {
                this.measurements = data;
            });
        this.loadingCtrl.dismiss();
    }

    addMeasurements() {
        this.navCtrl.push(MeasurementPage, { param: { order: this.order, customer: this.customer } });
    }

    navigateMeasurePage(measurement) {
        this.navCtrl.push(MeasurementDetailsPage, { param: { order: this.order, measurement: measurement } });
    }
}