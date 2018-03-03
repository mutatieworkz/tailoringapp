import { Component, ViewChild } from '@angular/core';
import { NavController, Content, PopoverController } from 'ionic-angular';
import { AddCustomerPage } from '../customer/add-customer/add-customer';
import { CustomerPage } from '../customer/customer-list/customer';
import { DatabaseProvider } from './../../providers/database/database';
import { MeasurementNamePage } from '../measurement/measurementName/measurementName';
import { MeasurementTypePage } from '../measurement/measurementType/measurementType';
import { OrderPage } from '../order/order';
import { ProfilePopoverPage } from './../../popOvers/profilePopOver';

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
    public databaseProvider: DatabaseProvider,
    public popoverCtrl: PopoverController) {

  }
  ionViewWillEnter() {
    this.databaseProvider.getDatabaseState().subscribe(ready => {
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
    this.databaseProvider.getCustomerCount().then(data => {
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

  popover_Click(ev) {
    let popover = this.popoverCtrl.create(ProfilePopoverPage, {
      contentEle: this.content.getNativeElement()
    });
    popover.present({
      ev: ev
    });
  }
}
