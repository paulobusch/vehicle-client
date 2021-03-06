
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
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
import { QueriesHandlerService } from './shared/handlers/query-handler-service';
import { MutationsHandlerService } from './shared/handlers/mutation-handler-service';
import { VehiclesFormComponent } from './vehicles/vehicles-form/vehicles-form.component';
import { VehiclesListComponent } from './vehicles/vehicles-list/vehicles-list.component';
import { HttpInterceptorProviders } from './shared/interceptors/provider-interceptor';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmDialogComponent } from './shared/modal/confirm-dialog/confirm-dialog.component';
import { ModalService } from './shared/modal/modal.service';
import { ModelsListComponent } from './models/models-list/models-list.component';
import { ModelsFormComponent } from './models/models-form/models-form.component';
import { SnackbarModule } from 'ngx-snackbar';
import { SnackService } from './shared/services/snack-service';
import { BrandsListComponent } from './brands/brands-list/brands-list.component';
import { BrandsFormComponent } from './brands/brands-form/brands-form.component';
import { ContactFormComponent } from './contact/contact-form/contact-form.component';
import { NgxMaskModule } from 'ngx-mask';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { HomePageComponent } from './home/home-page/home-page.component';
import { SalesReportComponent } from './reports/sales-report/sales-report.component';
import { VehiclesFormPhotoComponent } from './vehicles/vehicles-form-photo/vehicles-form-photo.component';
import { ImageCropperModule } from 'ngx-image-cropper';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    AnnouncementsListComponent,
    AnnouncementsFormComponent,
    ReservationsListComponent,
    ReservationsFormComponent,
    LoginFormComponent,
    VehiclesFormComponent,
    VehiclesListComponent,
    ConfirmDialogComponent,
    ModelsListComponent,
    ModelsFormComponent,
    BrandsListComponent,
    BrandsFormComponent,
    ContactFormComponent,
    HomePageComponent,
    SalesReportComponent,
    VehiclesFormPhotoComponent
  ],
  imports: [
    FormsModule,
    ImageCropperModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SnackbarModule.forRoot(),
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    TypeaheadModule.forRoot(),
    NgxMaskModule.forRoot(),
    PaginationModule.forRoot(),
  ],
  providers: [
    AuthGuard,
    AuthService,
    ModalService,
    SnackService,
    MutationsHandlerService,
    QueriesHandlerService,
    HttpInterceptorProviders,
    { provide: LOCALE_ID, useValue: 'pt-BR' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
