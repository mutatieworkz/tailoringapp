import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController, ToastController } from 'ionic-angular';
import { DatabaseProvider } from './../../providers/database/database';
import { MeasurementPage } from './../measurement/measurement';
import { MeasurementDetailsPage } from './../measurementDetails/measurementDetails';
import { ChangeOrderStatusPage } from './../../modals/changeOrderStatus/changeOrderStatus';
import { SelectSearchable } from '../../components/select/select';

@Component({
    selector: 'page-order',
    templateUrl: 'order.html'
})

export class OrderPage implements OnInit {
    customer: any;
    order: any;
    orderTypes = [];
    loadingCtrl: any;
    dueDate: String = new Date().toISOString();
    selectedCustomer: any;
    customers = [];
    isCustomerVisible: boolean = false;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private databaseProvider: DatabaseProvider,
        private loading: LoadingController,
        private toastCtrl: ToastController,
        public modalCtrl: ModalController) {

        if (this.navParams.data.param != undefined) {
            this.customer = this.navParams.data.param.customer;
            this.order = this.navParams.data.param.order;
            this.databaseProvider.orderId = this.order != null ? this.order.Id : undefined;
        }
        else {
            this.isCustomerVisible = true;
            this.customer = { Name: "Unknown" };
            this.getCustomer();
        }

        this.checkOrder();
    }
    ngOnInit(): void {
        this.getCustomer();
    }


    addOrder() {
        this.databaseProvider.addOrder(this.customer.Id, this.dueDate)
            .then(data => {
                this.databaseProvider.getOrderById(data.insertId).then(data => {
                    this.navCtrl.push(OrderPage, { param: { order: data[0], customer: this.customer } });
                });
            });
    }

    getCustomer() {
        this.databaseProvider.getAllCustomers().then(data => {
            this.customers = [];
            this.customers = data;
        });
    }

    changeStatus() {
        let modal = this.modalCtrl.create(ChangeOrderStatusPage, { param: { order: this.order, customer: this.customer } });
        modal.onDidDismiss(() => {
            // Call the method to do whatever in your home.ts
            this.loadOrderDetails();
            this.loadMeasurements();
            console.log('Modal closed');
        });
        modal.present();
    }

    changeDueDate(dueDate) {
        this.order.DueDate = new Date(dueDate);
    }

    async ionViewDidEnter() {
        this.loadingCtrl = this.loading.create({
            content: 'Please wait...'
        })
        this.loadingCtrl.present();
        await this.databaseProvider.delay(500);
        this.loadOrderDetails();
        this.loadMeasurements();
    }

    loadOrderDetails() {
        this.databaseProvider.getOrderById(this.order.Id)
            .then(data => {
                this.order = data[0];
                this.checkOrder();
            });
    }

    loadMeasurements() {
        this.databaseProvider.getOrderTypeByOrderId(this.databaseProvider.orderId)
            .then(data => {
                this.orderTypes = data;
            });
        this.loadingCtrl.dismiss();
    }

    addMeasurements() {
        if (this.customer.Id == undefined) {
            this.presentToast("Please select customer");
            return;
        }
        this.navCtrl.push(MeasurementPage, { param: { order: this.order, customer: this.customer } });
    }

    navigateMeasurePage(orderType) {
        this.navCtrl.push(MeasurementDetailsPage, { param: { order: this.order, OrderType: orderType } });
    }

    customerChange(event: { component: SelectSearchable, value: any }) {
        console.log('value:', event.value);
        console.log(this.selectedCustomer);
        //this.customer.Name = this.selectedCustomer.Name;
        this.customer = this.selectedCustomer;
    }

    private checkOrder() {
        if (this.order == undefined) {
            this.order = {
                OrderDate: new Date(),
                DueDate: new Date()
            };
        }
    }
    presentToast(content: string) {
        const toast = this.toastCtrl.create({
            message: content,
            duration: 3000,
            position: 'middle'
        });
        toast.present();

    }
}