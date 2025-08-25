import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-add-trip',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-trip.component.html',
  styleUrl: './add-trip.component.css'
})
export class AddTripComponent {
  constructor(private trips: TripDataService, private router: Router) {}

  onSubmit(f: NgForm): void {
    const body: Partial<Trip> = {
      code: f.value.code,
      name: f.value.name,
      length: f.value.length,
      start: f.value.start,
      resort: f.value.resort,
      perPerson: f.value.perPerson,
      image: f.value.image,
      description: f.value.description
    };
    this.trips.addTrip(body).subscribe({
      next: () => this.router.navigateByUrl('/'),
      error: (err) => console.error('Add trip error', err)
    });
  }
}
