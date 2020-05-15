import { Component, OnInit } from '@angular/core';
import { ListState } from 'src/app/shared/metadata/list-state';
import { AnnouncementList } from 'src/app/announcements/queries/view-models/announcement-list';
import { BrandList } from 'src/app/brands/queries/view-models/brand-list';
import { ModelList } from 'src/app/models/queries/view-models/model-list';
import { QueriesHandlerService } from 'src/app/shared/handlers/query-handler-service';
import { ListBrands } from 'src/app/brands/queries/list-brands';
import { SnackService } from 'src/app/shared/services/snack-service';
import { ListModels } from 'src/app/models/queries/list-models';
import { ListAnnouncement } from 'src/app/announcements/queries/list-announcements';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  brands: BrandList[] = [];
  models: ModelList[] = [];

  query: ListAnnouncement = new ListAnnouncement();
  announcements: AnnouncementList[] = [];
  listState: ListState = new ListState();
  clientFilter = {
    brandName: '',
    modelName: ''
  };

  constructor(
    private queriesHandler: QueriesHandlerService,
    private snackService: SnackService
  ) { }

  ngOnInit(): void {
    this.refresh();
    this.loadSelects();
  }

  refresh() {
    this.listState.reset();
    this.queriesHandler.handle(this.query).subscribe(
      (rs) => {
        this.announcements = rs.data;
        this.listState.loaded(rs);
      },
      () => this.snackService.open('Falha ao carregar anúncios')
    );
  }

  loadSelects() {
    const listBrands = new ListBrands();
    this.queriesHandler.handle(listBrands).subscribe(
      (rs) => this.brands = rs.data,
      () => this.snackService.open('Falha ao carregar marcas!')
    );

    const listModels = new ListModels();
    this.queriesHandler.handle(listModels).subscribe(
      (rs) => this.models = rs.data,
      () => this.snackService.open('Falha ao carregar modelos!')
    );
  }
}
