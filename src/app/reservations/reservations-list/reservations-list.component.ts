import { Component, OnInit } from '@angular/core';
import { ReservationList } from '../queries/view-models/reservation-list';
import { Router } from '@angular/router';
import { QueriesHandlerService } from 'src/app/shared/handlers/query-handler-service';
import { ListReservations } from '../queries/list-reservations';
import { SnackService } from 'src/app/shared/services/snack-service';
import { ListState } from 'src/app/shared/metadata/list-state';
import { BrandList } from 'src/app/brands/queries/view-models/brand-list';
import { ListBrands } from 'src/app/brands/queries/list-brands';
import { ModalService } from 'src/app/shared/modal/modal.service';
import { DeleteReservation } from '../mutations/delete-reservation';
import { MutationsHandlerService } from 'src/app/shared/handlers/mutation-handler-service';
import { FinishReservation } from '../mutations/finish-reservation';
import { ListModelsSelect } from 'src/app/models/queries/list-models-select';
import { ModelSelectList } from 'src/app/models/queries/view-models/model-select-list';
import * as _ from 'lodash';

@Component({
  selector: 'app-reservations-list',
  templateUrl: './reservations-list.component.html',
  styleUrls: ['./reservations-list.component.css']
})
export class ReservationsListComponent implements OnInit {

  listState: ListState = new ListState();
  query: ListReservations = new ListReservations();
  queryClient = {
    contactName: '',
    brandName: '',
    modelName: ''
  };

  models: ModelSelectList[] = [];
  brands: BrandList[] = [];

  reservations: ReservationList[] = [];
  reservationsFiltred: ReservationList[] = [];

  constructor(
    private router: Router,
    private modalServie: ModalService,
    private snackService: SnackService,
    private queriesHandler: QueriesHandlerService,
    private mutationHandler: MutationsHandlerService
  ) { }

  ngOnInit(): void {
    this.loadSelects();
    this.refresh();
  }

  refresh() {
    this.listState.reset();
    this.queriesHandler.handle(this.query).subscribe(
      rs => {
        this.listState.loaded(rs);
        this.reservations = rs.data;
        this.reservationsFiltred = rs.data;
      },
      () => this.snackService.open('Falha ao carregar reservas!')
    );
  }

  filter() {
    const { brandName, contactName, modelName } = this.queryClient;
    const rawContact = _.deburr(contactName.toLocaleLowerCase());
    this.reservationsFiltred = this.reservations.filter(reservation => {
      return (!contactName || reservation.contactName.indexOf(rawContact) !== -1)
        && (!modelName || reservation.vehicleModelName === modelName)
        && (!brandName || reservation.vehicleBrandName === brandName);
    });
  }

  open(id: string) {
    this.router.navigate(['reservations', 'edit', id]);
  }

  finish(id: string) {
    this.modalServie.confirmInformation('Confirmar Pagamento', 'Deseja baixar a reserva?', true).subscribe(confirm => {
      if (!confirm) return;
      const mutation = new FinishReservation(id, new Date());
      this.mutationHandler.handle(mutation).subscribe(
        () => {
          this.reservations = this.reservations.filter(r => r.id !== id);
          this.reservationsFiltred = this.reservationsFiltred.filter(r => r.id !== id);
          this.snackService.open('Reserva baixada com sucesso');
        },
        () => this.snackService.open('Falha ao baixar reserva!')
      );
    });
  }

  remove(id: string) {
    this.modalServie.confirmRemove('Deseja remover a reserva?').subscribe(confirm => {
      if (!confirm) return;
      const mutation = new DeleteReservation(id);
      this.mutationHandler.handle(mutation).subscribe(
        () => {
          this.reservations = this.reservations.filter(r => r.id !== id);
          this.reservationsFiltred = this.reservationsFiltred.filter(r => r.id !== id);
          this.snackService.open('Reserva removida com sucesso')
        },
        () => this.snackService.open('Falha ao remover reserva!')
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
    const listBrands = new ListBrands();
    this.queriesHandler.handle(listBrands).subscribe(
      rs => this.brands = rs.data,
      () => this.snackService.open('Falha ao carregar marcas')
    );
  }
}
