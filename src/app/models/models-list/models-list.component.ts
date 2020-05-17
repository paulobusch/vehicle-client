import { Component, OnInit } from '@angular/core';
import { ModelList } from 'src/app/models/queries/view-models/model-list';
import { ListModels } from 'src/app/models/queries/list-models';
import { QueriesHandlerService } from 'src/app/shared/handlers/query-handler-service';
import { ModalService } from 'src/app/shared/modal/modal.service';
import { Router } from '@angular/router';
import { ListState } from 'src/app/shared/metadata/list-state';
import * as _ from 'lodash';
import { DeleteModel } from '../mutations/delete-model';
import { SnackService } from 'src/app/shared/services/snack-service';
import { MutationsHandlerService } from 'src/app/shared/handlers/mutation-handler-service';
import { BrandList } from 'src/app/brands/queries/view-models/brand-list';
import { ListBrands } from 'src/app/brands/queries/list-brands';

@Component({
  selector: 'app-models-list',
  templateUrl: './models-list.component.html',
  styleUrls: ['./models-list.component.css']
})
export class ModelsListComponent implements OnInit {

  brands: BrandList[] = [];
  models: ModelList[] = [];
  modelsFiltred: ModelList[] = [];

  listState: ListState = new ListState();
  query: ListModels = new ListModels();
  queryClient: any = {
    name: '',
    brandName: ''
  };

  constructor(
    private router: Router,
    private modalService: ModalService,
    private snackService: SnackService,
    private queriesHandler: QueriesHandlerService,
    private mutationsHandler: MutationsHandlerService
  ) { }

  ngOnInit(): void {
    this.loadSelects();
    this.refresh();
  }

  refresh() {
    const query = new ListModels();
    this.listState.reset();
    this.queriesHandler.handle(query).subscribe(
      (rs) => {
        this.models = rs.data;
        this.modelsFiltred = rs.data;
        this.listState.loaded(rs);
      },
      () => this.snackService.open('Falha ao listar modelos!')
    );
  }

  filter() {
    const { brandName } = this.queryClient;
    const rawName = _.deburr(this.queryClient.name).toLowerCase() as string;
    this.modelsFiltred = this.models.filter(
      m => (!rawName || m.name.toLowerCase().indexOf(rawName) !== -1)
        && (!brandName || m.brandName === brandName)
    );
    this.listState.totalRows = this.modelsFiltred.length;
    this.listState.noItems = this.modelsFiltred.length === 0;
  }

  open(id: string) {
    this.router.navigate(['models', 'edit', id]);
  }

  remove(id: string) {
    this.modalService.confirmRemove('Tem certeza que deseja remover o modelo?').subscribe(confirm => {
      if (!confirm) return;
      const mutation = new DeleteModel(id);
      this.mutationsHandler.handle(mutation).subscribe(
        (rs) => {
          this.models = this.models.filter(v => v.id !== id);
          this.modelsFiltred = this.modelsFiltred.filter(v => v.id !== id);
          this.snackService.open('Modelo removido com sucesso');
        },
        () => this.snackService.open('Falha ao remover modelo!')
      );
    });
  }

  loadSelects() {
    const listBrands = new ListBrands();
    this.queriesHandler.handle(listBrands).subscribe(
      (rs) => this.brands = rs.data,
      ()  => this.snackService.open('Falha ao carregar marcas de veículos!'));
  }
}
