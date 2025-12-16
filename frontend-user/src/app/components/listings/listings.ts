import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ListingService, Listing } from '../../services/listing.service';

@Component({
  selector: 'app-listings',
  imports: [CommonModule, RouterModule],
  templateUrl: './listings.html',
  styleUrl: './listings.scss',
})
export class Listings implements OnInit {
  listings: Listing[] = [];
  loading = true;
  error = '';

  constructor(private listingService: ListingService) {}

  ngOnInit() {
    this.loadListings();
  }

  loadListings() {
    this.listingService.getListings().subscribe({
      next: (listings) => {
        this.listings = listings;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar alojamientos';
        this.loading = false;
      }
    });
  }
}
