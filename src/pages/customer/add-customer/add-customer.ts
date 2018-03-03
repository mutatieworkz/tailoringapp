import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { DatabaseProvider } from './../../../providers/database/database';

/**
 * Generated class for the AddCustomerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-customer',
  templateUrl: 'add-customer.html'
})
export class AddCustomerPage {
  txtname: string;
  gender: string;
  txtAge: number;
  txtAddress: string;
  txtPhone: string;
  dtBirthday: Date;
  closeVisible: boolean = false;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private databaseProvider: DatabaseProvider,
    private toastCtrl: ToastController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddCustomerPage');
  }
  onChange(selectedValue) {
    this.gender = selectedValue;
  }
  Submit() {
    this.databaseProvider.addCustomer(this.txtname, this.gender, this.txtAge
      , this.txtAddress, this.txtPhone, this.dtBirthday).then(data => {
        this.presentToast(this.txtname + ' added successfully');
        this.txtname = this.txtAddress = this.txtPhone = null;
        this.txtAge = null;
        this.gender = null;
        this.dtBirthday = new Date();
      });
  }

  presentToast(content: string) {
    const toast = this.toastCtrl.create({
      message: content,
      duration: 3000,
      position: 'middle'
    });
    toast.onDidDismiss(() => {
      this.navCtrl.pop();
    });
    toast.present();

  }

}
