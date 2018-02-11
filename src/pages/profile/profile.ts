import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NavController, ToastController } from 'ionic-angular';
import { DatabaseProvider } from './../../providers/database/database';


@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html'
})

export class ProfilePage {
    profileImg: any;
    profile: any;
    constructor(private databaseProvider: DatabaseProvider) {
        this.setProfileImg();
        this.profile = this.databaseProvider.User[0];
    }

    private setProfileImg() {
        this.profileImg = this.databaseProvider.User[0].Gender == 'Male' ? 'assets/Male.png' : 'assets/Female.png';
    }
}