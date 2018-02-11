import { Component, ViewChild } from '@angular/core';
import { App, NavController, ToastController, Content, ViewController, PopoverController } from 'ionic-angular';
import { AddCustomerPage } from '../add-customer/add-customer';
import { CustomerPage } from '../customer-list/customer';
import { DatabaseProvider } from './../../providers/database/database';
import { MeasurementNamePage } from '../measurementName/measurementName';
import { MeasurementTypePage } from '../measurementType/measurementType';
import { OrderPage } from '../order/order';
import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';

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
    public popoverCtrl: PopoverController,
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

  popover_Click(ev) {
    let popover = this.popoverCtrl.create(PopoverPage, {
      contentEle: this.content.getNativeElement()
    });
    popover.present({
      ev: ev
    });
  }
}




@Component({
  template: `
    <ion-list>
      <button ion-item (click)="profile_Click()">
      <ion-icon name="md-contact"></ion-icon>&nbsp;&nbsp;&nbsp;Profile
      </button>
      <button ion-item (click)="logout_Click()">
      <ion-icon name="md-log-out"></ion-icon>&nbsp;&nbsp;&nbsp;Logout
      </button>
    </ion-list>
  `
})
export class PopoverPage {
  userName: string;
  constructor(public navCtrl: NavController,
    public databaseprovider: DatabaseProvider,
    public viewCtrl: ViewController,
    public app: App) {
    this.userName = this.databaseprovider.User[0].Username;
  }

  profile_Click() {
    this.navCtrl.push(ProfilePage).then(() => { this.viewCtrl.dismiss(); });
  }

  logout_Click() {
    this.databaseprovider.updateIsLogin(this.databaseprovider.User[0].UserId, false)
      .then(data => {
        this.app.getRootNav().setRoot(HomePage).then(() => { this.viewCtrl.dismiss(); });
      }, err => { });

  }
}