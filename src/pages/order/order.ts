import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { DatabaseProvider } from './../../providers/database/database';
import { MeasurementPage } from './../measurement/measurement';

@Component({
    selector: 'page-order',
    templateUrl: 'order.html'
})

export class OrdertPage {
    customer: any;
    order: any;
    // measurementTypes = [];
    // selectedType: any;
    // status = [];
    // selectedStatus: any;
    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private databaseProvider: DatabaseProvider,
        private toastCtrl: ToastController) {
        this.customer = this.navParams.data.param.customer;
        this.order = this.navParams.data.param.order;
        console.log(this.order);
        console.log(this.customer);
        // this.databaseProvider.getMeasurementType().then(data => {
        //     this.measurementTypes = data;
        // });
        // this.databaseProvider.getStatus().then(data => {
        //     this.status = data;
        // });
    }

    changeStatus() {

    }

    addMeasurements() {
        this.navCtrl.push(MeasurementPage, { param: { order: this.order, customer: this.customer }});
    }
}