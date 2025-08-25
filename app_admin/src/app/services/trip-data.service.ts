import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BROWSER_STORAGE } from '../storage';

import { Trip } from '../models/trip';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {
  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) { }

  baseUrl = `http://${window.location.hostname}:3000/api`;

  getTrips(): Observable<Trip[]> {
    const url = `${this.baseUrl}/trips`;
    return this.http.get<Trip[]>(url);
  }

  addTrip(trip: Partial<Trip>): Observable<Trip> {
    const url = `${this.baseUrl}/trips`;
    return this.http.post<Trip>(url, trip);
  }

  updateTrip(tripId: string, updates: Partial<Trip>): Observable<Trip> {
    const url = `${this.baseUrl}/trips/${tripId}`;
    return this.http.put<Trip>(url, updates);
  }

  login(user: User, passwd: string): Observable<AuthResponse> {
    return this.handleAuthAPICall('login', user, passwd);
  }

  register(user: User, passwd: string): Observable<AuthResponse> {
    return this.handleAuthAPICall('register', user, passwd);
  }

  private handleAuthAPICall(endpoint: string, user: User, passwd: string): Observable<AuthResponse> {
    const formData: any = { name: user.name, email: user.email, password: passwd };
    // Map both server response shapes: raw token string or { token }
    return this.http.post<any>(`${this.baseUrl}/${endpoint}`, formData).pipe(
      map((value: any) => {
        if (value && typeof value === 'object' && 'token' in value) {
          return value as AuthResponse;
        } else if (typeof value === 'string') {
          return { token: value } as AuthResponse;
        } else {
          return { token: '' } as AuthResponse;
        }
      })
    );
  }
}
