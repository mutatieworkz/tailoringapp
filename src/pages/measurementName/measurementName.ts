import { Component } from '@angular/core';
import { NavController, ToastController, ModalController } from 'ionic-angular';
import { DatabaseProvider } from './../../providers/database/database';
import { AddEditMeasurementNamePage } from './../../modals/addEditMeasurementName/addEditMeasurementName';

@Component({
  selector: 'page-measurementName',
  templateUrl: 'measurementName.html'
})
export class MeasurementNamePage {
  measurementName: any = [];
  groupedMeasurementName = [];
  constructor(public navCtrl: NavController,
    public toastCtrl: ToastController,
    public databaseProvider: DatabaseProvider,
    public modalCtrl: ModalController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MeasurementTypePage');
    this.loadMeasurementName();
  }

  loadMeasurementName() {
    this.databaseProvider.getMeasurementName().then(data => {
      this.measurementName = data;
      this.groupMeasurementName(data);
    });
  }

  groupMeasurementName(measurements) {

    let currentType = false;
    let currentName = [];

    measurements.forEach((value, index) => {

      if (value.TypeName != currentType) {

        currentType = value.TypeName;

        let newGroup = {
          TypeName: currentType,
          names: []
        };

        currentName = newGroup.names;
        this.groupedMeasurementName.push(newGroup);

      }
      currentName.push(value);
    });
  }

  addNameClick() {
    this.loadModal(undefined);
  }

  editNameClick(name) {
    this.loadModal(name);
  }

  loadModal(name) {
    let modal = this.modalCtrl.create(AddEditMeasurementNamePage, { name: name });
    modal.onDidDismiss(() => {
      // Call the method to do whatever in your home.ts
      this.loadMeasurementName();
      console.log('Modal closed');
    });
    modal.present();
  }
}