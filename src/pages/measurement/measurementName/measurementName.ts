import { Component, trigger, state, transition, style, animate } from '@angular/core';
import { NavController, ToastController, ModalController } from 'ionic-angular';
import { DatabaseProvider } from './../../../providers/database/database';
import { AddEditMeasurementNamePage } from './../../../modals/addEditMeasurementName/addEditMeasurementName';

@Component({
  selector: 'page-measurementName',
  templateUrl: 'measurementName.html',
  styles: [
    `
    .item-block{
      min-height: 0;
      transition: 0.09s all linear;
    }
    `
  ],
  animations: [
    trigger('expand', [
      state('true', style({ height: '45px' })),
      state('false', style({ height: '0' })),
      transition('void => *', animate('0s')),
      transition('* <=> *', animate('250ms linear'))
    ])
  ]
})
export class MeasurementNamePage {
  measurementName: any = [];
  groupedMeasurementName = [];
  constructor(public navCtrl: NavController,
    public toastCtrl: ToastController,
    public databaseProvider: DatabaseProvider,
    public modalCtrl: ModalController) {

  }

  ionViewDidEnter() {
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
          isToggle: false,
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

  onToggle(group) {
    this.groupedMeasurementName.filter(x => x.TypeName == group.TypeName)[0].isToggle = !group.isToggle;
  }

  toggleGroup(group) {
    group.isToggle = !group.isToggle;
  }

  public isGroupShown(group) {
    return group.isToggle;
  }
}