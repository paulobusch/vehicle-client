import { Component } from '@angular/core';
import { User } from './login/mutations/view-models/user-result';
import { AuthService } from './shared/services/auth-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user: User;

  constructor(
    private authService: AuthService
  ) {
    this.authService.currentUser.subscribe(us => this.user = us);
  }
}
