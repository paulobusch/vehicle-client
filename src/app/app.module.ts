
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import {SnackbarModule} from 'ngx-snackbar';
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
import { QueriesHandlerService } from './shared/handlers/query-handler-service';
import { MutationsHandlerService } from './shared/handlers/mutation-handler-service';
import { VehiclesFormComponent } from './vehicles/vehicles-form/vehicles-form.component';
import { VehiclesListComponent } from './vehicles/vehicles-list/vehicles-list.component';
import { HttpInterceptorProviders } from './shared/interceptors/provider-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    AnnouncementsListComponent,
    AnnouncementsFormComponent,
    ReservationsListComponent,
    ReservationsFormComponent,
    LoginFormComponent,
    VehiclesFormComponent,
    VehiclesListComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    SnackbarModule.forRoot()
  ],
  providers: [
    AuthGuard,
    AuthService,
    MutationsHandlerService,
    QueriesHandlerService,
    HttpInterceptorProviders,
    { provide: LOCALE_ID, useValue: 'pt-BR' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
