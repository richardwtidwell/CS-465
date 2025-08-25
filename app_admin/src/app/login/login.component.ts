import { Component } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  constructor(private auth: AuthenticationService, private router: Router) {}

  onLoginSubmit(f: NgForm): void {
    const u: User = { name: f.value.name, email: f.value.email } as User;
    this.auth.login(u, f.value.password);
    this.router.navigateByUrl('/');
  }

  onRegisterSubmit(f: NgForm): void {
    const u: User = { name: f.value.name, email: f.value.email } as User;
    this.auth.register(u, f.value.password);
    this.router.navigateByUrl('/');
  }
}

