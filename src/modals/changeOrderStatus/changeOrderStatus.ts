import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { DatabaseProvider } from './../../providers/database/database';


@Component({
    selector: 'page-changeOrderStatus',
    templateUrl: 'changeOrderStatus.html'
})

export class ChangeOrderStatusPage {
    customer: any;
    order: any;
    status = [];
    selectedStatus: any;
    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private databaseProvider: DatabaseProvider,
        private toastCtrl: ToastController,
        public viewCtrl: ViewController) {
        this.customer = this.navParams.data.param.customer;
        this.order = this.navParams.data.param.order;
        console.log(this.order);
        console.log(this.customer);

        this.databaseProvider.getStatus().then(data => {
            this.status = data;
            this.selectedStatus = this.status.filter(x => x.Id == this.order.StatusId)[0];
            console.log(this.selectedStatus);
        });
    }

    onSlectionChanged(state) {
        this.selectedStatus = state;
    }
    changeStatus() {
        this.databaseProvider.updateOrderStatus(this.selectedStatus.Id, this.order.Id)
            .then(data => {
                this.presentToast("Status updated successfully");
            });
    }

    presentToast(content: string) {
        const toast = this.toastCtrl.create({
            message: content,
            duration: 1000,
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