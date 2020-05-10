import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnnouncementsListComponent } from './announcements/announcements-list/announcements-list.component';
import { ReservationsListComponent } from './reservations/reservations-list/reservations-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'announcements' },
  { path: 'announcements', component: AnnouncementsListComponent },
  { path: 'reservations', component: ReservationsListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
