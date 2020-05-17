import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef, Inject, AfterViewInit } from '@angular/core';
import { ModalService } from 'src/app/shared/modal/modal.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-vehicles-form-photo',
  templateUrl: './vehicles-form-photo.component.html',
  styleUrls: ['./vehicles-form-photo.component.css']
})
export class VehiclesFormPhotoComponent implements AfterViewInit {
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;

  loading = true;
  imageChangedEvent: any = '';
  croppedImage = '';
  public onClose: Subject<string>;

  constructor(
    private modalService: ModalService,
    private modalRef: BsModalRef
  ) {
    this.onClose = new Subject();
  }

  ngAfterViewInit() {
    this.fileInput.nativeElement.click();
  }

  confirm() {
    this.onClose.next(this.croppedImage);
    this.modalRef.hide();
  }

  cancel() {
    this.onClose.next();
    this.modalRef.hide();
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  loadImageFailed() {
    this.modalService.showInformation('Falha', 'Falha ao carregar a imagem');
  }
}
