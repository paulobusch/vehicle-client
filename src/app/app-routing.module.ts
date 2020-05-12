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

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'announcements' },
  { path: 'login', component: LoginFormComponent },
  { path: 'announcements', component: AnnouncementsListComponent },
  { path: 'reservations', canActivate: [AuthGuard], component: ReservationsListComponent },
  { path: 'vehicles', canActivate: [AuthGuard], component: VehiclesListComponent },
  { path: 'vehicles/new', canActivate: [AuthGuard], component: VehiclesFormComponent },
  { path: 'vehicles/edit/:id', canActivate: [AuthGuard], component: VehiclesFormComponent },
  { path: 'models', canActivate: [AuthGuard], component: ModelsListComponent },
  { path: 'models/new', canActivate: [AuthGuard], component: ModelsFormComponent },
  { path: 'models/edit/:id', canActivate: [AuthGuard], component: ModelsFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
