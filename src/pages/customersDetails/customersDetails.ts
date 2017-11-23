import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { DatabaseProvider } from './../../providers/database/database';
import { EditCustomerPage } from './../../modals/edit-customer/editcustomer';
import { OrderPage } from '../order/order';

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
  loadingCtrl: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private databaseProvider: DatabaseProvider,
    private loading: LoadingController,
    public modalCtrl: ModalController) {
    var param = navParams.get('customer');
    this.customerId = param.Id;
  }

  async ionViewDidEnter() {
    console.log('ionViewDidLoad CustomersDetailsPage');
    this.loadingCtrl = this.loading.create({
      content: 'Please wait...'
    })
    this.loadingCtrl.present();
    await this.databaseProvider.delay(500);
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
      this.loadingCtrl.dismiss();
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
    // this.databaseProvider.addOrder(this.customerId)
    //   .then(data => {
    //     this.databaseProvider.getOrderById(data.insertId).then(data => {
           this.navCtrl.push(OrderPage, { param: { customer: this.customer } });
    //     });
    //   });
  }

  navigateOrderPage(order) {
    this.navCtrl.push(OrderPage, { param: { order: order, customer: this.customer } })
  }
}
