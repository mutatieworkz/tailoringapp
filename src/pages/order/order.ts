import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { DatabaseProvider } from './../../providers/database/database';
import { MeasurementPage } from './../measurement/measurement';
import { ChangeOrderStatusPage } from './../../modals/changeOrderStatus/changeOrderStatus';

@Component({
    selector: 'page-order',
    templateUrl: 'order.html'
})

export class OrderPage {
    customer: any;
    order: any;
    measurements = [];
    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private databaseProvider: DatabaseProvider,
        public modalCtrl: ModalController) {
        this.customer = this.navParams.data.param.customer;
        this.order = this.navParams.data.param.order;
        console.log(this.order);
        console.log(this.customer);
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

    ionViewDidEnter() {
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
    }

    addMeasurements() {
        this.navCtrl.push(MeasurementPage, { param: { order: this.order, customer: this.customer } });
    }

    navigateMeasurePage(measurement) {

    }
}