import { Component, OnInit } from '@angular/core';
import { ListModels } from 'src/app/models/queries/list-models';
import { ModelList } from 'src/app/models/queries/view-models/model-list';
import { BrandList } from 'src/app/brands/queries/view-models/brand-list';
import { ListState } from 'src/app/shared/metadata/list-state';
import { ListBrands } from 'src/app/brands/queries/list-brands';
import { Router } from '@angular/router';
import { QueriesHandlerService } from 'src/app/shared/handlers/query-handler-service';
import { SnackService } from 'src/app/shared/services/snack-service';
import { ModalService } from 'src/app/shared/modal/modal.service';
import { DeleteAnnouncement } from '../mutations/delete-announcement';
import { MutationsHandlerService } from 'src/app/shared/handlers/mutation-handler-service';
import { AnnouncementList } from '../queries/view-models/announcement-list';
import { ListAnnouncement } from '../queries/list-announcements';
import * as moment from 'moment';

@Component({
  selector: 'app-announcements-list',
  templateUrl: './announcements-list.component.html',
  styleUrls: ['./announcements-list.component.css']
})
export class AnnouncementsListComponent implements OnInit {

  announcements: AnnouncementList[] = [];

  brands: BrandList[] = [];
  models: ModelList[] = [];

  query: ListAnnouncement = new ListAnnouncement();
  listState: ListState = new ListState();
  clientFilter =  {
    modelName: '',
    brandName: ''
  };

  constructor(
    private router: Router,
    private modalService: ModalService,
    private queriesHandler: QueriesHandlerService,
    private mutationsHandler: MutationsHandlerService,
    private snackService: SnackService
  ) { }

  ngOnInit(): void {
    this.loadSelects();
    this.refresh();
  }

  refresh() {
    this.listState.reset();
    if (!this.clientFilter.brandName) this.query.brandId = null;
    if (!this.clientFilter.modelName) this.query.modelId = null;
    this.queriesHandler.handle(this.query).subscribe(
      (rs) => {
        this.announcements = rs.data;
        this.listState.loaded(rs);
      },
      () => this.snackService.open('Falha ao carregar anúncios!')
    );
  }

  open(id: string) {
    this.router.navigate(['announcements', 'edit', id]);
  }

  loadSelects() {
    const listModels = new ListModels();
    this.queriesHandler.handle(listModels).subscribe(
      rs => this.models = rs.data,
      () => this.snackService.open('Falha ao carregar modelos')
    );
    const listBrands = new ListBrands();
    this.queriesHandler.handle(listBrands).subscribe(
      rs => this.brands = rs.data,
      () => this.snackService.open('Falha ao carregar marcas')
    );
  }

  formatDate(dateStr: string) {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-br');
  }

  remove(id: string) {
    this.modalService.confirmRemove('Tem certeza que deseja remover o anúncio?').subscribe(confirm => {
      if (!confirm) return;
      const mutation = new DeleteAnnouncement(id);
      this.mutationsHandler.handle(mutation).subscribe(
        (rs) => {
          this.announcements = this.announcements.filter(v => v.id !== id);
          this.snackService.open('Anúncio removido com sucesso');
        },
        () => this.snackService.open('Falha ao remover anúncio!')
      );
    });
  }
}
