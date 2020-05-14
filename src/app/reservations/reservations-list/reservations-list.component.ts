import { Component, OnInit } from '@angular/core';
import { ReservationList } from '../queries/view-models/reservation-list';
import { Router } from '@angular/router';
import { QueriesHandlerService } from 'src/app/shared/handlers/query-handler-service';
import { ListReservations } from '../queries/list-reservations';
import { SnackService } from 'src/app/shared/services/snack-service';
import { ListState } from 'src/app/shared/metadata/list-state';
import { BrandList } from 'src/app/brands/queries/view-models/brand-list';
import { ModelList } from 'src/app/models/queries/view-models/model-list';
import { ListModels } from 'src/app/models/queries/list-models';
import { ListBrands } from 'src/app/brands/queries/list-brands';
import { ModalService } from 'src/app/shared/modal/modal.service';
import { DeleteReservation } from '../mutations/delete-reservation';
import { MutationsHandlerService } from 'src/app/shared/handlers/mutation-handler-service';
import { FinishReservation } from '../mutations/finish-reservation';
import * as _ from 'lodash';

@Component({
  selector: 'app-reservations-list',
  templateUrl: './reservations-list.component.html',
  styleUrls: ['./reservations-list.component.css']
})
export class ReservationsListComponent implements OnInit {

  query: ListReservations = new ListReservations();
  listState: ListState = new ListState();

  clientFilter = {
    contactName: '',
    brandName: '',
    modelName: ''
  };

  models: ModelList[] = [];
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
    const rawContact = _.deburr(this.clientFilter.contactName.toLocaleLowerCase());
    this.reservationsFiltred = this.reservations.filter(reservation => {
      return (!this.clientFilter.contactName || reservation.contactName.indexOf(rawContact) !== -1)
        && (!this.clientFilter.modelName || reservation.vehicleModelName === this.clientFilter.modelName)
        && (!this.clientFilter.brandName || reservation.vehicleBrandName === this.clientFilter.brandName);
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
}
