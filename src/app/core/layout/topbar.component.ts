import { Component } from '@angular/core';
import { AppComponent } from '../../app.component';

@Component({
    selector: 'app-topbar',
    template: `
        <div class="topbar clearfix">

            <div class="topbar-right">
                <div style="float: left; color: white; margin-top: 10px; font-size: 16px; display: flex;">
                    <img style="height: 60px; margin-top: -17px;" src="./assets/images/ducky_logo.png">
                    <h1 style="margin-left: 10px"class="dd-logo">DUCKY DINNERS</h1>
                </div>

                <a id="topbar-menu-button" href="#" (click)="app.onTopbarMenuButtonClick($event)">
                    <i class="material-icons">menu</i>
                </a>

                <ul class="topbar-items animated fadeInDown" [ngClass]="{'topbar-items-visible': app.topbarMenuActive}">
                    <li #settings [ngClass]="{'active-top-menu':app.activeTopbarItem === settings}">
                        <a href="#" (click)="app.onTopbarItemClick($event,settings)">
                            <i class="topbar-icon material-icons">settings</i>
                            <span class="topbar-item-name">Settings</span>
                        </a>
                        <ul class="ultima-menu animated fadeInDown">
                            <li role="menuitem">
                                <a href="#">
                                    <i class="material-icons">palette</i>
                                    <span>Just a Button</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    `
})
export class AppTopBar {

    constructor(public app: AppComponent) { }

}