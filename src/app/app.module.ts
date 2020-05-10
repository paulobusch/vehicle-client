
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnnouncementsListComponent } from './announcements/announcements-list/announcements-list.component';
import { AnnouncementsFormComponent } from './announcements/announcements-form/announcements-form.component';
import { ReservationsListComponent } from './reservations/reservations-list/reservations-list.component';
import { ReservationsFormComponent } from './reservations/reservations-form/reservations-form.component';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { AuthService } from './shared/services/auth-service';
import { AuthGuard } from './shared/guards/auth-guard';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AnnouncementsListComponent,
    AnnouncementsFormComponent,
    ReservationsListComponent,
    ReservationsFormComponent,
    LoginFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [
    AuthGuard,
    AuthService,
    { provide: LOCALE_ID, useValue: 'pt-BR' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
