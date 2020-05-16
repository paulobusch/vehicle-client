import { Component, OnInit, ChangeDetectorRef, AfterContentChecked } from '@angular/core';
import { ListState } from 'src/app/shared/metadata/list-state';
import { AnnouncementList } from 'src/app/announcements/queries/view-models/announcement-list';
import { BrandList } from 'src/app/brands/queries/view-models/brand-list';
import { ModelList } from 'src/app/models/queries/view-models/model-list';
import { QueriesHandlerService } from 'src/app/shared/handlers/query-handler-service';
import { ListBrands } from 'src/app/brands/queries/list-brands';
import { SnackService } from 'src/app/shared/services/snack-service';
import { ListModels } from 'src/app/models/queries/list-models';
import { ListAnnouncement } from 'src/app/announcements/queries/list-announcements';
import { ListColors } from 'src/app/vehicles/queries/list-colors';
import { ColorList } from 'src/app/vehicles/queries/view-models/color-list';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, AfterContentChecked {

  brands: BrandList[] = [];
  models: ModelList[] = [];
  colors: ColorList[] = [];

  announcements: AnnouncementList[] = [];
  query: ListAnnouncement = new ListAnnouncement();
  listState: ListState = new ListState();
  clientFilter = {
    brandName: '',
    modelName: '',
    colorName: ''
  };

  constructor(
    private ref: ChangeDetectorRef,
    private queriesHandler: QueriesHandlerService,
    private snackService: SnackService
  ) { }

  ngOnInit(): void {
    this.refresh();
    this.loadSelects();
  }

  ngAfterContentChecked() {
    this.ref.detectChanges();
  }

  search() {
    this.query.page = 1;
    this.refresh();
  }

  refresh() {
    this.listState.reset();
    if (!this.clientFilter.brandName) this.query.brandId = null;
    if (!this.clientFilter.modelName) this.query.modelId = null;
    if (!this.clientFilter.colorName) this.query.colorId = null;
    this.queriesHandler.handle(this.query).subscribe(
      (rs) => {
        this.announcements = rs.data;
        this.listState.loaded(rs);
      },
      () => this.snackService.open('Falha ao carregar anúncios')
    );
  }

  purchase(id: string) {

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

    const listModels = new ListModels();
    this.queriesHandler.handle(listModels).subscribe(
      (rs) => this.models = rs.data,
      () => this.snackService.open('Falha ao carregar modelos!')
    );
  }
}
