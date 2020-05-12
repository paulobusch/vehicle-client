import { Component, OnInit } from '@angular/core';
import { VehicleList } from '../queries/view-models/vehicle-list';
import { ListVehicles } from '../queries/list-vehicles';
import { QueriesHandlerService } from 'src/app/shared/handlers/query-handler-service';
import { SnackbarService } from 'ngx-snackbar';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ColorList } from '../queries/view-models/color-list';
import { ListColors } from '../queries/list-colors';
import { FuelList } from '../queries/view-models/fuel-list';
import { ModelList } from '../queries/view-models/model-list';
import { BrandList } from '../queries/view-models/brand-list';
import { ListFuels } from '../queries/list-fuels';
import { ListModels } from '../queries/list-models';
import { ListBrands } from '../queries/list-brands';
import { ListState } from 'src/app/shared/metadata/list-state';
import { DeleteVehicle } from '../mutations/delete-vehicle';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/shared/modal/modal.service';

@Component({
  selector: 'app-vehicles-list',
  templateUrl: './vehicles-list.component.html',
  styleUrls: ['./vehicles-list.component.css']
})
export class VehiclesListComponent implements OnInit {

  query: ListVehicles = new ListVehicles();

  vehicles: VehicleList[] = [];

  colors: ColorList[] = [];
  models: ModelList[] = [];
  brands: BrandList[] = [];

  colorName: string;
  modelName: string;
  brandName: string;

  listState: ListState = new ListState();

  constructor(
    private router: Router,
    private modalService: ModalService,
    private snackbarService: SnackbarService,
    private queriesHandler: QueriesHandlerService
  ) { }

  ngOnInit(): void {
    this.refresh();
    this.loadSelects();
  }

  refresh() {
    this.listState.reset();
    this.queriesHandler.handle(this.query).subscribe(
      (rs) => {
        this.vehicles = rs.data;
        this.listState.loaded(rs);
      },
      () => this.snackbarService.add({ msg: 'Erro ao listar veículos!', timeout: 3000 })
    );
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
          this.vehicles = this.vehicles.filter(v => v.id !== id);
          this.snackbarService.add({ msg: 'Veículo removido com sucesso', timeout: 3000 });
        },
        () => this.snackbarService.add({ msg: 'Falha ao remove veículo!', timeout: 3000 })
      );
    });
  }

  loadSelects() {
    const listColors = new ListColors();
    this.queriesHandler.handle(listColors).subscribe(
      (rs) => this.colors = rs.data,
      ()  => this.snackbarService.add({ msg: 'Falha ao carregar cores!', timeout: 3000 }));

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
