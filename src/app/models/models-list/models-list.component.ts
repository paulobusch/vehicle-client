import { Component, OnInit } from '@angular/core';
import { ModelList } from 'src/app/models/queries/view-models/model-list';
import { ListModels } from 'src/app/models/queries/list-models';
import { QueriesHandlerService } from 'src/app/shared/handlers/query-handler-service';
import { SnackbarService } from 'ngx-snackbar';
import { ModalService } from 'src/app/shared/modal/modal.service';
import { Router } from '@angular/router';
import { ListState } from 'src/app/shared/metadata/list-state';
import * as _ from 'lodash';
import { DeleteModel } from '../mutations/delete-model';

@Component({
  selector: 'app-models-list',
  templateUrl: './models-list.component.html',
  styleUrls: ['./models-list.component.css']
})
export class ModelsListComponent implements OnInit {

  models: ModelList[] = [];
  filtredModels: ModelList[] = [];

  listState: ListState = new ListState();
  query: ListModels = new ListModels();
  queryClient: any = {
    name: ''
  };

  constructor(
    private router: Router,
    private modalService: ModalService,
    private snackbarService: SnackbarService,
    private queriesHandler: QueriesHandlerService,
  ) { }

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    const query = new ListModels();
    this.listState.reset();
    this.queriesHandler.handle(query).subscribe(
      (rs) => {
        this.models = rs.data;
        this.filtredModels = rs.data;
        this.listState.loaded(rs);
      },
      () => this.snackbarService.add({ msg: 'Falha ao listar modelos!', timeout: 3000 })
    );
  }

  filter() {
    const rawName = _.deburr(this.queryClient.name) as string;
    this.filtredModels = this.models.filter(m => m.name.indexOf(rawName) !== -1);
    this.listState.totalRows = this.filtredModels.length;
    this.listState.noItems = this.filtredModels.length === 0;
  }

  open(id: string) {
    this.router.navigate(['models', 'edit', id]);
  }

  remove(id: string) {
    this.modalService.confirmRemove('Tem certeza que deseja remover o modelo?').subscribe(confirm => {
      if (!confirm) return;
      const mutation = new DeleteModel(id);
      this.queriesHandler.handle(mutation).subscribe(
        (rs) => {
          this.models = this.models.filter(v => v.id !== id);
          this.filtredModels = this.filtredModels.filter(v => v.id !== id);
          this.snackbarService.add({ msg: 'Modelo removido com sucesso', timeout: 3000 });
        },
        () => this.snackbarService.add({ msg: 'Falha ao remover modelo!', timeout: 3000 })
      );
    });
  }
}
