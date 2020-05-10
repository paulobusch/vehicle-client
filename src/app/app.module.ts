
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnnouncementsListComponent } from './announcements/announcements-list/announcements-list.component';
import { AnnouncementsFormComponent } from './announcements/announcements-form/announcements-form.component';
import { ReservationsListComponent } from './reservations/reservations-list/reservations-list.component';
import { ReservationsFormComponent } from './reservations/reservations-form/reservations-form.component';

@NgModule({
  declarations: [
    AppComponent,
    AnnouncementsListComponent,
    AnnouncementsFormComponent,
    ReservationsListComponent,
    ReservationsFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
