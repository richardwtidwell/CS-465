import { Inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { TripDataService } from '../services/trip-data.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private tripDataService: TripDataService
  ) {}

  authResp: AuthResponse = new AuthResponse();

  public getToken(): string {
    const val = this.storage.getItem('travlr-token');
    return val || '';
  }

  public saveToken(token: string): void {
    this.storage.setItem('travlr-token', token);
  }

  public logout(): void {
    this.storage.removeItem('travlr-token');
  }

  public isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    } catch {
      return false;
    }
  }

  public getCurrentUser(): User {
    const token = this.getToken();
    try {
      const { email, name } = JSON.parse(atob(token.split('.')[1]));
      return { email, name } as User;
    } catch {
      return { email: '', name: '' } as User;
    }
  }

  public login(user: User, passwd: string): void {
    this.tripDataService.login(user, passwd).subscribe({
      next: (value: any) => {
        if (value) {
          this.authResp = value;
          this.saveToken(this.authResp.token);
        }
      },
      error: (error: any) => console.log('Error: ' + error)
    });
  }

  public register(user: User, passwd: string): void {
    this.tripDataService.register(user, passwd).subscribe({
      next: (value: any) => {
        if (value) {
          this.authResp = value;
          this.saveToken(this.authResp.token);
        }
      },
      error: (error: any) => console.log('Error: ' + error)
    });
  }
}

