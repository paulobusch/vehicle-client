import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {
  public message: string;
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
