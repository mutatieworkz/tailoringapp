import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { DatabaseProvider } from './../../providers/database/database';

/**
 * Generated class for the AddCustomerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-edit-customer',
  templateUrl: './../../pages/add-customer/add-customer.html'
})
export class EditCustomerPage {
  id: number;
  txtname: string;
  gender: string;
  txtAge: number;
  txtAddress: string;
  txtPhone: string;
  dtBirthday: Date;
  closeVisible: boolean = true;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private databaseProvider: DatabaseProvider,
    private toastCtrl: ToastController,
    public viewCtrl: ViewController) {
    var customer = navParams.get('customer');
    this.id = customer.Id;
    this.txtname = customer.Name;
    this.gender = customer.Gender;
    this.txtAge = customer.Age;
    this.txtAddress = customer.Address;
    this.txtPhone = customer.Phone;
    this.dtBirthday = customer.DOB;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditCustomer Modal');
  }
  onChange(selectedValue) {
    this.gender = selectedValue;
  }
  Submit() {
    this.databaseProvider.editCustomer(this.id, this.txtname, this.gender, this.txtAge
      , this.txtAddress, this.txtPhone, this.dtBirthday).then(data => {
        this.presentToast(this.txtname + ' updated successfully');
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
      this.dismiss();
    });
    toast.present();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
