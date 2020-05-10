import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth-service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void { }
}
