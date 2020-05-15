import { Component, OnInit } from '@angular/core';
import { AnnouncementDetail } from '../queries/view-models/announcement-detail';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GetAnnouncement } from '../queries/get-announcement';
import { CreateAnnouncement } from '../mutations/create-announcement';
import { NewId } from 'src/app/shared/random/new-id';
import { UpdateAnnouncement } from '../mutations/update-announcements';
import { ListVehiclesSelect } from 'src/app/vehicles/queries/list-vehicles-select';
import { SnackService } from 'src/app/shared/services/snack-service';
import { QueriesHandlerService } from 'src/app/shared/handlers/query-handler-service';
import { VehicleSelectList } from 'src/app/vehicles/queries/view-models/vehicle-select-list';
import { MutationsHandlerService } from 'src/app/shared/handlers/mutation-handler-service';

@Component({
  selector: 'app-announcements-form',
  templateUrl: './announcements-form.component.html',
  styleUrls: ['./announcements-form.component.css']
})
export class AnnouncementsFormComponent implements OnInit {

  form: FormGroup;

  id: string;
  isNew: boolean;
  announcement: AnnouncementDetail;

  vehicles: VehicleSelectList[] = [];

  vehicleName: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackService: SnackService,
    private queriesHandler: QueriesHandlerService,
    private mutationsHandler: MutationsHandlerService
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.isNew = !this.id;
    this.form = this.formBuilder.group({
      pricePurchase: new FormControl('', [Validators.required]),
      priceSale: new FormControl('', [Validators.required]),
      vehicleId: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.loadSelects();
    this.loadAnnouncement();
  }

  loadAnnouncement() {
    if (this.isNew) return;
    const query = new GetAnnouncement(this.id);
    this.queriesHandler.handle(query).subscribe(
      (rs) => this.setData(rs.data),
      (err) => this.snackService.open('Falha ao carregar anúncio!')
    );
  }

  setData(announcement: AnnouncementDetail) {
    this.announcement = announcement;
    this.form.patchValue(this.announcement);
    this.vehicleName = this.announcement.vehicleName;
  }

  save() {
    this.form.markAllAsTouched();

    if (!this.isValidForm()) return;
    const value = this.form.getRawValue();
    if (this.isNew) {
      value.id = NewId();
      const mutation = Object.assign(new CreateAnnouncement(), value);
      this.mutationsHandler.handle(mutation).subscribe(
        (rs) => this.close(),
        () => this.snackService.open('Falha ao salvar anúncio!')
      );
    } else {
      value.id = this.id;
      const mutation = Object.assign(new UpdateAnnouncement(), value);
      this.mutationsHandler.handle(mutation).subscribe(
        (rs) => this.close(),
        () => this.snackService.open('Falha ao atualizar anúncio!')
      );
    }
  }

  close() {
    this.router.navigate(['announcements']);
  }

  onSelect(valueId: string, fieldId: string): void {
    const control = this.form.controls[fieldId];
    control.setValue(valueId);
    control.updateValueAndValidity();
  }

  isValidForm(): boolean {
    this.form.markAllAsTouched();

    if (!this.form.valid) {
      this.snackService.open('Existem campos inválidos!');
      return false;
    }
    return true;
  }

  isValidField(fieldId: string): boolean {
    const field = this.form.controls[fieldId];
    return field.valid || !field.touched;
  }

  loadSelects() {
    const listVehicles = new ListVehiclesSelect();
    this.queriesHandler.handle(listVehicles).subscribe(
      (rs) => this.vehicles = rs.data,
      ()  => this.snackService.open('Falha ao carregar veículos!'));
  }
}
