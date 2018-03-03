import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';

import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { SQLite } from '@ionic-native/sqlite';

import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { UserRegistrationPage } from '../pages/user/userRegistration/userRegistration';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { AddCustomerPage } from '../pages/customer/add-customer/add-customer'
import { CustomerPage } from '../pages/customer/customer-list/customer';
import { CustomersDetailsPage } from '../pages/customer/customersDetails/customersDetails'
import { MeasurementNamePage } from '../pages/measurement/measurementName/measurementName';
import { MeasurementTypePage } from '../pages/measurement/measurementType/measurementType';
import { MeasurementPage } from '../pages/measurement/measurement/measurement';
import { MeasurementDetailsPage } from '../pages/measurement/measurementDetails/measurementDetails';
import { OrderPage } from '../pages/order/order';
import { ProfilePage } from '../pages/user/profile/profile'
import { ForgotPasswordPage } from '../pages/user/forgotPassword/forgotPassword';

import { DatabaseProvider } from '../providers/database/database';
import { ImageProcessProvider } from '../providers/imageProcess/imageProcess';

import { GenderToimagePipe } from '../pipes/gender-toimage';

import { EditCustomerPage } from '../modals/edit-customer/editcustomer';
import { AddEditMeasurementNamePage } from '../modals/addEditMeasurementName/addEditMeasurementName';
import { AddEditMeasurementTypePage } from '../modals/addEditMeasurementType/addEditMeasurementType';
import { ChangeOrderStatusPage } from '../modals/changeOrderStatus/changeOrderStatus';
import { EditMeasurementPage } from '../modals/editMeasurement/editMeasurement';
import { EditProfilePage } from '../modals/editProfile/editProfile';

import { SelectSearchableModule } from '../components/select/select-module';

import { ProfilePopoverPage } from '../popOvers/profilePopOver';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    UserRegistrationPage,
    DashboardPage,
    AddCustomerPage,
    CustomerPage,
    CustomersDetailsPage,
    EditCustomerPage,
    MeasurementNamePage,
    MeasurementTypePage,
    MeasurementPage,
    MeasurementDetailsPage,
    OrderPage,
    ProfilePage,
    ForgotPasswordPage,
    AddEditMeasurementNamePage,
    AddEditMeasurementTypePage,
    ChangeOrderStatusPage,
    EditMeasurementPage,
    EditProfilePage,
    GenderToimagePipe,
    ProfilePopoverPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
    BrowserAnimationsModule,
    SelectSearchableModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    UserRegistrationPage,
    DashboardPage,
    AddCustomerPage,
    CustomerPage,
    CustomersDetailsPage,
    EditCustomerPage,
    MeasurementNamePage,
    MeasurementTypePage,
    MeasurementPage,
    MeasurementDetailsPage,
    OrderPage,
    ProfilePage,
    ForgotPasswordPage,
    AddEditMeasurementNamePage,
    AddEditMeasurementTypePage,
    ChangeOrderStatusPage,
    EditMeasurementPage,
    EditProfilePage,
    ProfilePopoverPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    File,
    Transfer,
    Camera,
    FilePath,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    DatabaseProvider,
    ImageProcessProvider,
    SQLitePorter,
    SQLite
  ]
})
export class AppModule { }
