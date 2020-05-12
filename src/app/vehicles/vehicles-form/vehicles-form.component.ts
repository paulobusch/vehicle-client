import { Component, OnInit } from '@angular/core';
import { ColorList } from '../queries/view-models/color-list';
import { FuelList } from '../queries/view-models/fuel-list';
import { ModelList } from '../../models/queries/view-models/model-list';
import { BrandList } from '../queries/view-models/brand-list';
import { QueriesHandlerService } from 'src/app/shared/handlers/query-handler-service';
import { ListColors } from '../queries/list-colors';
import {SnackbarService} from 'ngx-snackbar';
import { ListFuels } from '../queries/list-fuels';
import { ListModels } from '../../models/queries/list-models';
import { ListBrands } from '../queries/list-brands';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateVechicle } from '../mutations/create-vehicle';
import { MutationsHandlerService } from 'src/app/shared/handlers/mutation-handler-service';
import { NewId } from 'src/app/shared/random/new-id';
import { UpdateVechicle } from '../mutations/update-vehicle';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead/ngx-bootstrap-typeahead';
import { GetVehicle } from '../queries/get-vehicle';
import { VehicleDetail } from '../queries/view-models/vehicle-detail';

@Component({
  selector: 'app-vehicles-form',
  templateUrl: './vehicles-form.component.html',
  styleUrls: ['./vehicles-form.component.css']
})
export class VehiclesFormComponent implements OnInit {

  id: string;
  isNew: boolean;
  form: FormGroup;
  vehicle: VehicleDetail;

  colors: ColorList[] = [];
  fuels: FuelList[] = [];
  models: ModelList[] = [];
  brands: BrandList[] = [];

  fuelName: string;
  colorName: string;
  modelName: string;
  brandName: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackbarService: SnackbarService,
    private queriesHandler: QueriesHandlerService,
    private mutationsHandler: MutationsHandlerService
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.isNew = !this.id;
    this.form = this.formBuilder.group({
      year: new FormControl(null, [Validators.min(1950), Validators.required]),
      colorId: new FormControl(null, [Validators.required]),
      fuelId: new FormControl(null, [Validators.required]),
      brandId: new FormControl(null, [Validators.required]),
      modelId: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit(): void {
    this.loadSelects();
    this.loadVehicle();
  }

  loadVehicle() {
    if (this.isNew) return;
    const query = new GetVehicle(this.id);
    this.queriesHandler.handle(query).subscribe(
      (rs) => this.setData(rs.data),
      (err) => this.snackbarService.add({ msg: 'Falha ao carregar veículo!', timeout: 3000 })
    );
  }

  setData(vehicle: VehicleDetail) {
    this.vehicle = vehicle;
    if (!vehicle) return;
    this.form.patchValue(this.vehicle);
    this.fuelName = this.vehicle.fuelName;
    this.colorName = this.vehicle.colorName;
    this.brandName = this.vehicle.brandName;
    this.modelName = this.vehicle.modelName;
  }

  save() {
    this.form.markAllAsTouched();

    const value = this.form.getRawValue();
    value.id = this.isNew ? NewId() : this.id;
    if (!this.isValidForm()) return;
    if (this.isNew) {
      const mutation = Object.assign(new CreateVechicle(), value);
      this.mutationsHandler.handle(mutation).subscribe(
        (rs) => this.close(),
        () => this.snackbarService.add({ msg: 'Falha ao salvar veículo!', timeout: 3000 })
      );
    } else {
      const mutation = Object.assign(new UpdateVechicle(), value);
      this.mutationsHandler.handle(mutation).subscribe(
        (rs) => this.close(),
        () => this.snackbarService.add({ msg: 'Falha ao atualizar veículo!', timeout: 3000 })
      );
    }
  }

  close() {
    this.router.navigate(['vehicles']);
  }

  onSelect(valueId: string, fieldId: string): void {
    const control = this.form.controls[fieldId];
    control.setValue(valueId);
    control.updateValueAndValidity();
  }

  isValidForm(): boolean {
    if (!this.form.valid) {
      this.snackbarService.add({ msg: 'Existem campos inválidos!', timeout: 3000 });
      return false;
    }
    return true;
  }

  isValidField(fieldId: string): boolean {
    const field = this.form.controls[fieldId];
    return field.valid || !field.touched;
  }

  loadSelects() {
    const listColors = new ListColors();
    this.queriesHandler.handle(listColors).subscribe(
      (rs) => this.colors = rs.data,
      ()  => this.snackbarService.add({ msg: 'Falha ao carregar cores!', timeout: 3000 }));

    const listFuels = new ListFuels();
    this.queriesHandler.handle(listFuels).subscribe(
      (rs) => this.fuels = rs.data,
      ()  => this.snackbarService.add({ msg: 'Falha ao carregar combustíveis!', timeout: 3000 }));

    const listModels = new ListModels();
    this.queriesHandler.handle(listModels).subscribe(
      (rs) => this.models = rs.data,
      ()  => this.snackbarService.add({ msg: 'Falha ao carregar modelos de veículos!', timeout: 3000 }));

    const listBrands = new ListBrands();
    this.queriesHandler.handle(listBrands).subscribe(
      (rs) => this.brands = rs.data,
      ()  => this.snackbarService.add({ msg: 'Falha ao carregar marcas de veículos!', timeout: 3000 }));
  }
}
