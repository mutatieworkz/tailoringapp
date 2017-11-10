import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';
import { DatabaseProvider } from './../../providers/database/database';
import { CustomersDetailsPage } from '../customersDetails/customersDetails';

@Component({
    selector: 'page-add-customer',
    templateUrl: 'customer.html',
})
export class CustomerPage {
    customers: Array<any> = [];
    MaleCustomers: Array<any> = [];
    FemaleCustomers: Array<any> = [];
    gender: string = "Male";


    toggled: boolean;
    searchTerm: String = '';


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
            this.customers = data;
            this.FilterCustomer(data);
        });
    }

    private FilterCustomer(data: any[]) {
        this.MaleCustomers = [];
        this.FemaleCustomers = [];
        this.MaleCustomers = data.filter(gender => gender.Gender == "Male");
        this.FemaleCustomers = data.filter(gender => gender.Gender == "Female");
    }

    itemTapped(event, customer) {
        this.navCtrl.push(CustomersDetailsPage, {
            customer: customer
        });
    }

    toggleSearch() {
        this.toggled = this.toggled ? false : true;
        this.searchTerm = null;
    }

    searchCancel() {
        this.FilterCustomer(this.customers);
        this.toggleSearch();
    }

    triggerInput(ev: any) {
        // set val to the value of the searchbar
        let val = ev.target.value;
        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.MaleCustomers = this.customers.filter(gender => gender.Gender == "Male" && (gender.Name.toLowerCase().indexOf(val.toLowerCase()) > -1 || gender.Phone.indexOf(val) > -1));
            this.FemaleCustomers = this.customers.filter(gender => gender.Gender == "Female" && (gender.Name.toLowerCase().indexOf(val.toLowerCase()) > -1 || gender.Phone.indexOf(val) > -1));
        }
        else {
            this.FilterCustomer(this.customers);
        }
    }
}