import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth-service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MutationsHandlerService } from 'src/app/shared/handlers/mutation-handler-service';
import { LoginUser } from '../mutations/login-user';
import { Router } from '@angular/router';
import {SnackbarService} from 'ngx-snackbar';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  form: FormGroup;

  constructor(
    private snackbarService: SnackbarService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
  ) {
    this.form = this.formBuilder.group({
      userLogin: new FormControl('', [Validators.required]),
      userPassword: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void { }

  login() {
    this.form.markAllAsTouched();
    if (!this.validForm()) return;
    const raw = this.form.getRawValue();
    const mutation = new LoginUser(raw.userLogin, raw.userPassword);
    this.authService.login(mutation);
  }

  validForm(): boolean {
    if (this.form.invalid) {
      this.snackbarService.add({ msg: 'Existem campos inválidos!', timeout: 3000 });
      return false;
    }
    return true;
  }

  validField(fieldId: string): boolean {
    const field = this.form.controls[fieldId];
    return field.valid || !field.touched;
  }
}
