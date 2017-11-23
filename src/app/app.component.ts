import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AddCustomerPage } from '../pages/add-customer/add-customer';
import { CustomerPage } from '../pages/customer-list/customer';
import { MeasurementNamePage } from '../pages/measurementName/measurementName';
import { MeasurementTypePage } from '../pages/measurementType/measurementType';

//import { HomePage } from '../pages/home/home';
import { DashboardPage } from '../pages/dashboard/dashboard';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = DashboardPage;
  pages: Array<{ title: string, component: any, icon: string }>
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //statusBar.styleDefault();
      statusBar.overlaysWebView(false);
      statusBar.backgroundColorByHexString('#007ac1');
      splashScreen.hide();
    });

    this.pages = [
      { title: 'Add Customer', component: AddCustomerPage, icon: 'person-add' },
      { title: 'Customer List', component: CustomerPage, icon:'list' },
      { title: 'Measurement Type', component: MeasurementTypePage, icon:'shirt' },
      { title: 'Measurement Name', component: MeasurementNamePage, icon:'cut' }
    ];
  }

  openPage(page) {
    this.nav.push(page.component);
  }
}

