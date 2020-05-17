import { Component, OnInit, ChangeDetectorRef, AfterContentChecked } from '@angular/core';
import { ListState } from 'src/app/shared/metadata/list-state';
import { AnnouncementList } from 'src/app/announcements/queries/view-models/announcement-list';
import { BrandList } from 'src/app/brands/queries/view-models/brand-list';
import { QueriesHandlerService } from 'src/app/shared/handlers/query-handler-service';
import { ListBrands } from 'src/app/brands/queries/list-brands';
import { SnackService } from 'src/app/shared/services/snack-service';
import { ListAnnouncement } from 'src/app/announcements/queries/list-announcements';
import { ListColors } from 'src/app/vehicles/queries/list-colors';
import { ColorList } from 'src/app/vehicles/queries/view-models/color-list';
import { Router } from '@angular/router';
import { ListModelsSelect } from 'src/app/models/queries/list-models-select';
import { ModelSelectList } from 'src/app/models/queries/view-models/model-select-list';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  brands: BrandList[] = [];
  models: ModelSelectList[] = [];
  colors: ColorList[] = [];

  announcements: AnnouncementList[] = [];
  query: ListAnnouncement = new ListAnnouncement();
  listState: ListState = new ListState();
  queryClient = {
    brandName: '',
    modelName: '',
    colorName: ''
  };

  constructor(
    private router: Router,
    private queriesHandler: QueriesHandlerService,
    private snackService: SnackService
  ) { }

  ngOnInit(): void {
    this.refresh();
    this.loadSelects();
  }

  search() {
    this.query.page = 1;
    this.refresh();
  }

  refresh() {
    this.listState.reset();
    this.updateQuery();
    if (!this.queryClient.brandName) this.query.brandId = null;
    if (!this.queryClient.modelName) this.query.modelId = null;
    if (!this.queryClient.colorName) this.query.colorId = null;
    this.queriesHandler.handle(this.query).subscribe(
      (rs) => {
        this.announcements = rs.data;
        this.listState.loaded(rs);
      },
      () => this.snackService.open('Falha ao carregar anúncios')
    );
  }

  updateQuery() {
    const { brandName, colorName, modelName } = this.queryClient;
    this.query.brandId = brandName ? this.query.brandId : null;
    this.query.colorId = colorName ? this.query.colorId : null;
    this.query.modelId = modelName ? this.query.modelId : null;
  }

  purchase(id: string) {
    this.router.navigate(['reservations', 'new', { id_announcement: id }]);
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
      () => this.snackService.open('Falha ao carregar marcas!')
    );
  }
}
