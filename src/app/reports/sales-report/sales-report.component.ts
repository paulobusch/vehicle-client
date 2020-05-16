import { Component, OnInit } from '@angular/core';
import { ListAnnouncementReport } from '../queries/list-announcement-resport';
import { AnnouncementReportList } from '../queries/view-models/announcement-report-list';
import * as moment from 'moment';
import { QueriesHandlerService } from 'src/app/shared/handlers/query-handler-service';
import { SnackService } from 'src/app/shared/services/snack-service';
import { ListState } from 'src/app/shared/metadata/list-state';

@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.css']
})
export class SalesReportComponent implements OnInit {

  sales: AnnouncementReportList[] = [];

  listState: ListState = new ListState();
  query: ListAnnouncementReport = new ListAnnouncementReport();
  queryClient = {
    startDateStr: moment().format('YYYY-MM-DD'),
    endDateStr: moment().format('YYYY-MM-DD')
  };

  constructor(
    private queriesHandler: QueriesHandlerService,
    private snackService: SnackService,
  ) { }

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.updateQuery();
    if (!this.isValidQuery()) return;
    this.listState.reset();
    this.queriesHandler.handle(this.query).subscribe(
      (rs) => {
        this.sales = rs.data;
        this.listState.loaded(rs);
      },
      () => this.snackService.open('Falha ao carregar dados do relatório!')
    );
  }

  updateQuery() {
    const { startDateStr, endDateStr }  = this.queryClient;
    this.query.startDate = startDateStr ? new Date(startDateStr) : null;
    this.query.endDate = endDateStr ? new Date(endDateStr) : null;
  }

  export() {

  }

  isValidQuery(): boolean {
    const hasRange = this.query.startDate && this.query.endDate;
    if (hasRange && moment(this.query.startDate).isAfter(this.query.endDate)){
      this.snackService.open('A data de início deve ser menor que a data fim!');
      return false;
    }

    return true;
  }

  formatDate(dateStr: string) {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-br');
  }
}
