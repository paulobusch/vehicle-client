import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {
  public title: string;
  public message: string;
  public confirmCritial: boolean;
  public btnConfirm = 'CONFIRMAR';
  public btnCancel = 'CANCELAR';
  public onClose: Subject<boolean>;

  constructor(
    private modalRef: BsModalRef
  ) {
    this.onClose = new Subject();
  }

  ngOnInit(): void { }

  cancel() {
    this.onClose.next(false);
    this.modalRef.hide();
  }

  confirm() {
    this.onClose.next(true);
    this.modalRef.hide();
  }
}
