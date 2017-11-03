import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { DatabaseProvider } from './../../providers/database/database';
import { EditCustomerPage } from './../../modals/edit-customer/editcustomer';
import { MeasurementPage } from '../measurement/measurement';
import { OrdertPage } from '../order/order';

/**
 * Generated class for the CustomersDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-customers-details',
  templateUrl: 'customersDetails.html',
})
export class CustomersDetailsPage {
  customer: any = {};
  orders = [];
  customerId: number = 0;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private databaseProvider: DatabaseProvider,
    public modalCtrl: ModalController) {
    var param = navParams.get('customer');
    this.customerId = param.Id;
    this.databaseProvider.getMeasurementType().then(data => {
      console.log(data);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomersDetailsPage');
    this.loadCustomerDetails();
    this.loadOrders();
  }

  loadCustomerDetails() {
    this.databaseProvider.getCustomerById(this.customerId).then(data => {
      if (data.length > 0)
        this.customer = data[0];
    });
  }

  loadOrders() {
    this.databaseProvider.getOrderByCustomer(this.customerId).then(data => {
      this.orders = data;
    });
  }

  editCustomer() {
    let modal = this.modalCtrl.create(EditCustomerPage, { customer: this.customer });
    modal.onDidDismiss(() => {
      // Call the method to do whatever in your home.ts
      this.loadCustomerDetails();
      console.log('Modal closed');
    });
    modal.present();
  }

  addOrders() {
    this.databaseProvider.addOrder(this.customerId)
      .then(data => {
        this.databaseProvider.getOrderById(data.insertId).then(data => {
          this.navCtrl.push(OrdertPage, { param: { order: data, customer: this.customer } });
        });
      });
  }

  navigateOrderPage(order) {
    this.navCtrl.push(OrdertPage, { param: { order: order, customer: this.customer } })
  }

}
