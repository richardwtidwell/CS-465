import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripListingComponent } from './trip-listing/trip-listing.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TripListingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Travlr Getaways Admin!';
}
