import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trip';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-trip.component.html'
})
export class EditTripComponent implements OnInit {
  tripId = '';
  model: Partial<Trip> = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private trips: TripDataService
  ) {}

  ngOnInit(): void {
    this.tripId = this.route.snapshot.params['tripId'];
    if (this.tripId) {
      this.trips.getTripById(this.tripId).subscribe({
        next: (t: Trip) => {
          this.model = { ...t };
        },
        error: (err) => console.error('Load trip error', err)
      });
    }
  }

  onSubmit(f: NgForm): void {
    this.trips.updateTrip(this.tripId, f.value).subscribe({
      next: () => this.router.navigateByUrl('/'),
      error: (err) => console.error('Update trip error', err)
    });
  }
}

