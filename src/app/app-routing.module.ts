import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnnouncementsListComponent } from './announcements/announcements-list/announcements-list.component';
import { ReservationsListComponent } from './reservations/reservations-list/reservations-list.component';
import { AuthGuard } from './shared/guards/auth-guard';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { VehiclesListComponent } from './vehicles/vehicles-list/vehicles-list.component';
import { VehiclesFormComponent } from './vehicles/vehicles-form/vehicles-form.component';
import { ModelsListComponent } from './models/models-list/models-list.component';
import { ModelsFormComponent } from './models/models-form/models-form.component';
import { BrandsListComponent } from './brands/brands-list/brands-list.component';
import { BrandsFormComponent } from './brands/brands-form/brands-form.component';
import { ContactFormComponent } from './contact/contact-form/contact-form.component';
import { ReservationsFormComponent } from './reservations/reservations-form/reservations-form.component';
import { AnnouncementsFormComponent } from './announcements/announcements-form/announcements-form.component';
import { HomePageComponent } from './home/home-page/home-page.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'announcements' },
  { path: 'login', component: LoginFormComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'announcements', component: AnnouncementsListComponent },
  { path: 'announcements/new', component: AnnouncementsFormComponent },
  { path: 'announcements/edit/:id', component: AnnouncementsFormComponent },
  { path: 'reservations', canActivate: [AuthGuard], component: ReservationsListComponent },
  { path: 'reservations/new', canActivate: [AuthGuard], component: ReservationsFormComponent },
  { path: 'reservations/edit/:id', canActivate: [AuthGuard], component: ReservationsFormComponent },
  { path: 'vehicles', canActivate: [AuthGuard], component: VehiclesListComponent },
  { path: 'vehicles/new', canActivate: [AuthGuard], component: VehiclesFormComponent },
  { path: 'vehicles/edit/:id', canActivate: [AuthGuard], component: VehiclesFormComponent },
  { path: 'models', canActivate: [AuthGuard], component: ModelsListComponent },
  { path: 'models/new', canActivate: [AuthGuard], component: ModelsFormComponent },
  { path: 'models/edit/:id', canActivate: [AuthGuard], component: ModelsFormComponent },
  { path: 'brands', canActivate: [AuthGuard], component: BrandsListComponent },
  { path: 'brands/new', canActivate: [AuthGuard], component: BrandsFormComponent },
  { path: 'brands/edit/:id', canActivate: [AuthGuard], component: BrandsFormComponent },
  { path: 'contact', canActivate: [AuthGuard], component: ContactFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
