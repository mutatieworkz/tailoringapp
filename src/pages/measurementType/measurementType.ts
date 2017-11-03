import { Component } from '@angular/core';
import { NavController, ToastController, ModalController } from 'ionic-angular';
import { DatabaseProvider } from './../../providers/database/database';
import { AddEditMeasurementTypePage } from './../../modals/addEditMeasurementType/addEditMeasurementType';


@Component({
  selector: 'page-measurementType',
  templateUrl: 'measurementType.html'
})
export class MeasurementTypePage {
  measurementType: any = [];
  constructor(public navCtrl: NavController, 
    public toastCtrl: ToastController, 
    public databaseProvider: DatabaseProvider, 
    public modalCtrl: ModalController) {

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MeasurementTypePage');
    this.loadMeasurementType();
  }

  loadMeasurementType() {
    this.databaseProvider.getMeasurementType().then(data => {
      this.measurementType = data;
    });
  }

  addTypeClick() {
    this.loadModal(undefined);
  }

  editTypeClick(type) {
    this.loadModal(type);
  }

  loadModal(type) {
    let modal = this.modalCtrl.create(AddEditMeasurementTypePage, { type: type });
    modal.onDidDismiss(() => {
      // Call the method to do whatever in your home.ts
      this.loadMeasurementType();
      console.log('Modal closed');
    });
    modal.present();
  }
}