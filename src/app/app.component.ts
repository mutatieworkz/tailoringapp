import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AddCustomerPage } from '../pages/customer/add-customer/add-customer';
import { CustomerPage } from '../pages/customer/customer-list/customer';
import { MeasurementNamePage } from '../pages/measurement/measurementName/measurementName';
import { MeasurementTypePage } from '../pages/measurement/measurementType/measurementType';

import { HomePage } from '../pages/home/home';
import { DashboardPage } from '../pages/dashboard/dashboard';

import { DatabaseProvider } from '../providers/database/database';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any;
  pages: Array<{ title: string, component: any, icon: string }>
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, databaseProvider: DatabaseProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //statusBar.styleDefault();
      databaseProvider.openSQLiteDatabase()
        .then(data => {
          databaseProvider.checkLoggedInUser()
            .then(data => {
              if (data.length > 0) {
                databaseProvider.User = data;
                this.rootPage = DashboardPage;
              }
              else {
                this.rootPage = HomePage;
              }
              this.hideSplash(statusBar, splashScreen);
            }, err => {
              console.log(err);
              this.rootPage = HomePage;
              this.hideSplash(statusBar, splashScreen);
            });
        })
    });

    this.pages = [
      { title: 'Add Customer', component: AddCustomerPage, icon: 'person-add' },
      { title: 'Customer List', component: CustomerPage, icon: 'list' },
      { title: 'Measurement Type', component: MeasurementTypePage, icon: 'shirt' },
      { title: 'Measurement Name', component: MeasurementNamePage, icon: 'cut' }
    ];
  }

  private hideSplash(statusBar: StatusBar, splashScreen: SplashScreen) {
    statusBar.overlaysWebView(false);
    statusBar.backgroundColorByHexString('#007ac1');
    splashScreen.hide();
  }

  openPage(page) {
    this.nav.push(page.component);
  }
}

