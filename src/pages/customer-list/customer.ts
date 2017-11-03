import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';
import { DatabaseProvider } from './../../providers/database/database';
import { CustomersDetailsPage } from '../customersDetails/customersDetails';

@Component({
    selector: 'page-add-customer',
    templateUrl: 'customer.html',
})
export class CustomerPage {
    MaleCustomers: Array<any> = [];
    FemaleCustomers: Array<any> = [];
    gender: string = "Male";

    @ViewChild(Content) content: Content;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private databaseProvider: DatabaseProvider) {

    }

    ionViewWillEnter() {
        this.databaseProvider.getDatabaseState().subscribe(ready => {
            if (ready) {
                this.loadCustomers();
            }
        });
    }

    ionViewDidEnter() {
        this.content.resize();
      }

    loadCustomers() {
        this.databaseProvider.getAllCustomers().then(data => {
            this.MaleCustomers = [];
            this.FemaleCustomers = [];
            this.MaleCustomers = data.filter(gender => gender.Gender == "Male");
            this.FemaleCustomers = data.filter(gender => gender.Gender == "Female");
        });
    }

    itemTapped(event, customer) {
        this.navCtrl.push(CustomersDetailsPage, {
            customer: customer
        });
    }
}