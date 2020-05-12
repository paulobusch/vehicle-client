import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SnackService } from 'src/app/shared/services/snack-service';
import { Router, ActivatedRoute } from '@angular/router';
import { ListModels } from '../queries/list-models';
import { QueriesHandlerService } from 'src/app/shared/handlers/query-handler-service';
import { GetModel } from '../queries/get-model';
import { ModelDetail } from '../queries/view-models/model-detail';
import { MutationsHandlerService } from 'src/app/shared/handlers/mutation-handler-service';
import { NewId } from 'src/app/shared/random/new-id';
import { CreateModel } from '../mutations/create-model';
import { UpdateModel } from '../mutations/update-model';

@Component({
  selector: 'app-models-form',
  templateUrl: './models-form.component.html',
  styleUrls: ['./models-form.component.css']
})
export class ModelsFormComponent implements OnInit {

  form: FormGroup;

  id: string;
  isNew: boolean;
  model: ModelDetail;

  constructor(
    private router: Router,
    private activeRouter: ActivatedRoute,
    private queriesHandler: QueriesHandlerService,
    private mutationsHandler: MutationsHandlerService,
    private formBuilder: FormBuilder,
    private snackService: SnackService
  ) {
    this.id = this.activeRouter.snapshot.paramMap.get('id');
    this.isNew = !this.id;
    this.form = this.formBuilder.group({
      name: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.loadModel();
  }

  loadModel() {
    if (this.isNew) return;
    const query = new GetModel(this.id);
    this.queriesHandler.handle(query).subscribe(
      (rs) => this.setData(rs.data),
      () => this.snackService.open('Falha ao carregar modelo!')
    );
  }

  setData(model: ModelDetail) {
    this.model = model;
    this.form.patchValue(this.model);
  }

  save() {
    if (!this.isValidForm()) return;
    const value = this.form.getRawValue();
    if (this.isNew) {
      value.id = NewId();
      const mutation = Object.assign(new CreateModel(), value);
      this.mutationsHandler.handle(mutation).subscribe(
        (rs) => this.close(),
        () => this.snackService.open('Falha ao salvar modelo!')
      );
    } else {
      value.id = this.id;
      const mutation = Object.assign(new UpdateModel(), value);
      this.mutationsHandler.handle(mutation).subscribe(
        (rs) => this.close(),
        () => this.snackService.open('Falha ao salvar modelo!')
      );
    }
  }

  close() {
    this.router.navigate(['models']);
  }

  isValidForm(): boolean {
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      this.snackService.open('Existem campos invávlidos!');
      return false;
    }
    return true;
  }

  isValidField(fieldId: string): boolean {
    const control = this.form.controls[fieldId];
    return control.valid || !control.touched;
  }
}
