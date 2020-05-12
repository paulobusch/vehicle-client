import { Component, OnInit } from '@angular/core';
import { BrandList } from 'src/app/brands/queries/view-models/brand-list';
import { ListState } from 'src/app/shared/metadata/list-state';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/shared/modal/modal.service';
import { SnackService } from 'src/app/shared/services/snack-service';
import { QueriesHandlerService } from 'src/app/shared/handlers/query-handler-service';
import { ListBrands } from '../queries/list-brands';
import * as _ from 'lodash';
import { DeleteBrand } from '../mutations/delete-brand';

@Component({
  selector: 'app-brands-list',
  templateUrl: './brands-list.component.html',
  styleUrls: ['./brands-list.component.css']
})
export class BrandsListComponent implements OnInit {

  brands: BrandList[] = [];
  brandsFiltred: BrandList[] = [];

  listState: ListState = new ListState();
  query: ListBrands = new ListBrands();
  queryClient: any = {
    name: ''
  };

  constructor(
    private router: Router,
    private modalService: ModalService,
    private snackService: SnackService,
    private queriesHandler: QueriesHandlerService,
  ) { }

  ngOnInit(): void {
    this.refresh();
  }
  refresh() {
    const query = new ListBrands();
    this.listState.reset();
    this.queriesHandler.handle(query).subscribe(
      (rs) => {
        this.brands = rs.data;
        this.brandsFiltred = rs.data;
        this.listState.loaded(rs);
      },
      () => this.snackService.open('Falha ao listar marcas!')
    );
  }

  filter() {
    const rawName = _.deburr(this.queryClient.name).toLowerCase() as string;
    this.brandsFiltred = this.brands.filter(m => m.name.toLowerCase().indexOf(rawName) !== -1);
    this.listState.totalRows = this.brandsFiltred.length;
    this.listState.noItems = this.brandsFiltred.length === 0;
  }

  open(id: string) {
    this.router.navigate(['brands', 'edit', id]);
  }

  remove(id: string) {
    this.modalService.confirmRemove('Tem certeza que deseja remover a marca?').subscribe(confirm => {
      if (!confirm) return;
      const mutation = new DeleteBrand(id);
      this.queriesHandler.handle(mutation).subscribe(
        (rs) => {
          this.brands = this.brands.filter(v => v.id !== id);
          this.brandsFiltred = this.brandsFiltred.filter(v => v.id !== id);
          this.snackService.open('Marca removido com sucesso');
        },
        () => this.snackService.open('Falha ao remover marca!')
      );
    });
  }
}
