import { Component, ViewChild } from '@angular/core';
import { App, NavController, ToastController, Content } from 'ionic-angular';
import { AddCustomerPage } from '../add-customer/add-customer';
import { CustomerPage } from '../customer-list/customer';
import { DatabaseProvider } from './../../providers/database/database';
import { MeasurementNamePage } from '../measurementName/measurementName';
import { MeasurementTypePage } from '../measurementType/measurementType';
import { OrderPage } from '../order/order';

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class DashboardPage {
  Male: string = "0";
  Female: string = "0";
  Total: number = 0;
  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController,
    public toastCtrl: ToastController,
    public databaseprovider: DatabaseProvider,
    public app: App) {

  }
  ionViewWillEnter() {
    this.databaseprovider.getDatabaseState().subscribe(ready => {
      if (ready) {
        this.loadCustomerCount();
      }
    });
  }

  ionViewDidEnter() {
    this.content.resize();
  }

  loadCustomerCount() {
    this.Total = 0;
    this.databaseprovider.getCustomerCount().then(data => {
      data.forEach(element => {
        if (element.Gender == "Female")
          this.Female = element.Count == null ? "0" : element.Count;
        else
          this.Male = element.Count == null ? "0" : element.Count;
        this.Total += element.Count;
      });
    });
  }

  navigateAddCustomerPage() {
    this.navCtrl.push(AddCustomerPage);
  }

  navigateCustomersPage() {
    this.navCtrl.push(CustomerPage);
  }

  navigateMeasurementTypePage() { this.navCtrl.push(MeasurementTypePage); }

  navigateMeasurementNamePage() { this.navCtrl.push(MeasurementNamePage); }

  navigateOrderPage() { this.navCtrl.push(OrderPage); }
}