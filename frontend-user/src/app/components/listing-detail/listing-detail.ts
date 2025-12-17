import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ListingService, Listing } from '../../services/listing.service';
import { BookingService } from '../../services/booking.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-listing-detail',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './listing-detail.html',
  styleUrl: './listing-detail.scss',
})
export class ListingDetail implements OnInit {
  listing: Listing | null = null;
  loading = true;
  error = '';
  checkIn = '';
  checkOut = '';
  bookingError = '';
  bookingSuccess = false;
  isAuthenticated = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private listingService: ListingService,
    private bookingService: BookingService,
    private authService: AuthService
  ) {
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  goBack() {
    this.router.navigate(['/listings']);
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadListing(id);
    }
  }

  loadListing(id: string) {
    this.listingService.getListing(id).subscribe({
      next: (listing) => {
        this.listing = listing;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar el alojamiento';
        this.loading = false;
      }
    });
  }

  onBook() {
    if (!this.checkIn || !this.checkOut) {
      this.bookingError = 'Por favor selecciona las fechas';
      return;
    }

    if (!this.listing) return;

    const checkInDate = new Date(this.checkIn);
    const checkOutDate = new Date(this.checkOut);

    if (checkOutDate <= checkInDate) {
      this.bookingError = 'La fecha de salida debe ser posterior a la de entrada';
      return;
    }

    this.bookingError = '';
    this.bookingSuccess = false;

    this.bookingService.createBooking({
      listingId: this.listing._id,
      checkIn: this.checkIn,
      checkOut: this.checkOut
    }).subscribe({
      next: () => {
        this.bookingSuccess = true;
        this.checkIn = '';
        this.checkOut = '';
      },
      error: (err) => {
        this.bookingError = err.error?.message || 'Error al crear la reserva';
      }
    });
  }
}
