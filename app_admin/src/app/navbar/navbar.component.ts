import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  constructor(public auth: AuthenticationService, private router: Router) {}
  logout(): void { this.auth.logout(); this.router.navigateByUrl('/'); }
}
