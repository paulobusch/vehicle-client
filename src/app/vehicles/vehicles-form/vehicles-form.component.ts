import { Component, OnInit } from '@angular/core';
import { ColorList } from '../queries/view-models/color-list';
import { FuelList } from '../queries/view-models/fuel-list';
import { ModelList } from '../queries/view-models/model-list';
import { BrandList } from '../queries/view-models/brand-list';
import { QueriesHandlerService } from 'src/app/shared/handlers/query-handler-service';
import { ListColors } from '../queries/list-colors';
import {SnackbarService} from 'ngx-snackbar';
import { ListFuels } from '../queries/list-fuels';
import { ListModels } from '../queries/list-models';
import { ListBrands } from '../queries/list-brands';

@Component({
  selector: 'app-vehicles-form',
  templateUrl: './vehicles-form.component.html',
  styleUrls: ['./vehicles-form.component.css']
})
export class VehiclesFormComponent implements OnInit {

  colors: ColorList[] = [];
  fuels: FuelList[] = [];
  models: ModelList[] = [];
  brands: BrandList[] = [];

  constructor(
    private snackbarService: SnackbarService,
    private queriesHandler: QueriesHandlerService
  ) { }

  ngOnInit(): void {
    this.loadSelects();
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
