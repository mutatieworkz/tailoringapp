import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';

import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { SQLite } from '@ionic-native/sqlite';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { AddCustomerPage } from '../pages/add-customer/add-customer'
import { CustomerPage } from '../pages/customer-list/customer';
import { CustomersDetailsPage } from '../pages/customersDetails/customersDetails'
import { MeasurementNamePage } from '../pages/measurementName/measurementName';
import { MeasurementTypePage } from '../pages/measurementType/measurementType';
import { MeasurementPage } from '../pages/measurement/measurement';
import { OrdertPage } from '../pages/order/order';

import { DatabaseProvider } from '../providers/database/database';

import { EditCustomerPage } from '../modals/edit-customer/editcustomer';
import { AddEditMeasurementNamePage } from '../modals/addEditMeasurementName/addEditMeasurementName';
import { AddEditMeasurementTypePage } from '../modals/addEditMeasurementType/addEditMeasurementType';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DashboardPage,
    AddCustomerPage,
    CustomerPage,
    CustomersDetailsPage,
    EditCustomerPage,
    MeasurementNamePage,
    MeasurementTypePage,
    MeasurementPage,
    OrdertPage,
    AddEditMeasurementNamePage,
    AddEditMeasurementTypePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DashboardPage,
    AddCustomerPage,
    CustomerPage,
    CustomersDetailsPage,
    EditCustomerPage,
    MeasurementNamePage,
    MeasurementTypePage,
    MeasurementPage,
    OrdertPage,
    AddEditMeasurementNamePage,
    AddEditMeasurementTypePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    DatabaseProvider,
    SQLitePorter,
    SQLite
  ]
})
export class AppModule { }
