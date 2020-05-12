import { Injectable } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(
    private modalService: BsModalService
  ) { }

  confirmRemove(message: string): Observable<boolean> {
    const modal = this.modalService.show(ConfirmDialogComponent, { class: 'modal-app', initialState: { message } });
    return modal.content.onClose.asObservable();
  }
}
