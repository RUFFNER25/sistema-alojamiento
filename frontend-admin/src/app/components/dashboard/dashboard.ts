import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ListingService } from '../../services/listing.service';
import { BookingService } from '../../services/booking.service';
import { Listing } from '../../services/listing.service';
import { Booking } from '../../services/booking.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  listings: Listing[] = [];
  bookings: Booking[] = [];
  stats = {
    totalListings: 0,
    totalBookings: 0,
    totalRevenue: 0
  };
  loading = true;

  constructor(
    private listingService: ListingService,
    private bookingService: BookingService
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.listingService.getListings().subscribe({
      next: (listings) => {
        this.listings = listings;
        this.stats.totalListings = listings.length;
        this.loadBookings();
      },
      error: (err) => {
        console.error('Error cargando listings', err);
        this.loading = false;
      }
    });
  }

  loadBookings() {
    this.bookingService.getBookings().subscribe({
      next: (bookings) => {
        this.bookings = bookings;
        this.stats.totalBookings = bookings.length;
        this.stats.totalRevenue = bookings.reduce((sum, b) => sum + b.totalPrice, 0);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando bookings', err);
        this.loading = false;
      }
    });
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('es-ES');
  }
}
