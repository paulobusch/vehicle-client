import { Component, OnInit } from '@angular/core';
import { VehicleList } from '../queries/view-models/vehicle-list';
import { ListVehicles } from '../queries/list-vehicles';
import { QueriesHandlerService } from 'src/app/shared/handlers/query-handler-service';
import { ColorList } from '../queries/view-models/color-list';
import { ModelList } from '../../models/queries/view-models/model-list';
import { BrandList } from '../../brands/queries/view-models/brand-list';
import { ListModels } from '../../models/queries/list-models';
import { ListBrands } from '../../brands/queries/list-brands';
import { ListState } from 'src/app/shared/metadata/list-state';
import { DeleteVehicle } from '../mutations/delete-vehicle';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/shared/modal/modal.service';
import { ListColors } from '../queries/list-colors';
import { SnackService } from 'src/app/shared/services/snack-service';
import { ModelSelectList } from 'src/app/models/queries/view-models/model-select-list';
import { ListModelsSelect } from 'src/app/models/queries/list-models-select';

@Component({
  selector: 'app-vehicles-list',
  templateUrl: './vehicles-list.component.html',
  styleUrls: ['./vehicles-list.component.css']
})
export class VehiclesListComponent implements OnInit {

  vehicles: VehicleList[] = [];
  vehiclesFiltred: VehicleList[] = [];

  models: ModelSelectList[] = [];
  brands: BrandList[] = [];
  colors: ColorList[] = [];

  listState: ListState = new ListState();
  query: ListVehicles = new ListVehicles();
  queryClient = {
    colorName: '',
    modelName: '',
    brandName: ''
  };

  constructor(
    private router: Router,
    private modalService: ModalService,
    private snackService: SnackService,
    private queriesHandler: QueriesHandlerService
  ) { }

  ngOnInit(): void {
    this.refresh();
    this.loadSelects();
  }

  refresh() {
    this.updateQuery();
    this.listState.reset();
    this.queriesHandler.handle(this.query).subscribe(
      (rs) => {
        this.vehicles = rs.data;
        this.vehiclesFiltred = rs.data;
        this.listState.loaded(rs);
      },
      () => this.snackService.open('Erro ao listar veículos!')
    );
  }

  filter() {
    const { brandName, colorName, modelName } = this.queryClient;
    this.vehiclesFiltred = this.vehicles.filter(vehicle => {
      return (!this.query.year || vehicle.year === this.query.year)
        && (!colorName || vehicle.colorName.toLowerCase() === colorName.toLowerCase())
        && (!brandName || vehicle.brandName.toLowerCase() === brandName.toLowerCase())
        && (!modelName || vehicle.modelName.toLowerCase() === modelName.toLowerCase());
    });
    this.listState.totalRows = this.vehiclesFiltred.length;
    this.listState.noItems = this.vehiclesFiltred.length === 0;
  }

  updateQuery() {
    const { brandName, colorName, modelName } = this.queryClient;
    this.query.modelId = modelName ? this.query.modelId : null;
    this.query.brandId = brandName ? this.query.brandId : null;
    this.query.colorId = colorName ? this.query.colorId : null;
  }

  open(id: string) {
    this.router.navigate(['vehicles', 'edit', id]);
  }

  remove(id: string) {
    this.modalService.confirmRemove('Tem certeza que deseja remover o veículo?').subscribe(confirm => {
      if (!confirm) return;
      const mutation = new DeleteVehicle(id);
      this.queriesHandler.handle(mutation).subscribe(
        (rs) => {
          this.vehiclesFiltred = this.vehiclesFiltred.filter(v => v.id !== id);
          this.vehicles = this.vehicles.filter(v => v.id !== id);
          this.snackService.open('Veículo removido com sucesso');
        },
        () => this.snackService.open('Falha ao remover veículo!')
      );
    });
  }

  loadModels(brandId: string) {
    this.queryClient.modelName = '';
    const listModels = new ListModelsSelect();
    listModels.brandId = brandId;
    this.queriesHandler.handle(listModels).subscribe(
      (rs) => this.models = rs.data,
      ()  => this.snackService.open('Falha ao carregar modelos de veículos!'));
  }

  loadSelects() {
    const listColors = new ListColors();
    this.queriesHandler.handle(listColors).subscribe(
      (rs) => this.colors = rs.data,
      ()  => this.snackService.open('Falha ao carregar cores!'));

    const listBrands = new ListBrands();
    this.queriesHandler.handle(listBrands).subscribe(
      (rs) => this.brands = rs.data,
      ()  => this.snackService.open('Falha ao carregar marcas de veículos!'));
  }
}
