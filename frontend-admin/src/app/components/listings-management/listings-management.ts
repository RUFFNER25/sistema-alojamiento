import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListingService, Listing, CreateListing } from '../../services/listing.service';

@Component({
  selector: 'app-listings-management',
  imports: [CommonModule, FormsModule],
  templateUrl: './listings-management.html',
  styleUrl: './listings-management.scss',
})
export class ListingsManagement implements OnInit {
  listings: Listing[] = [];
  loading = true;
  error = '';
  showForm = false;
  editingListing: Listing | null = null;

  formData: CreateListing = {
    title: '',
    description: '',
    address: '',
    pricePerNight: 0,
    images: []
  };

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

  openCreateForm() {
    this.editingListing = null;
    this.formData = {
      title: '',
      description: '',
      address: '',
      pricePerNight: 0,
      images: []
    };
    this.showForm = true;
  }

  openEditForm(listing: Listing) {
    this.editingListing = listing;
    this.formData = {
      title: listing.title,
      description: listing.description,
      address: listing.address,
      pricePerNight: listing.pricePerNight,
      images: listing.images || []
    };
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
    this.editingListing = null;
  }

  onSubmit() {
    if (this.editingListing) {
      this.updateListing();
    } else {
      this.createListing();
    }
  }

  createListing() {
    this.listingService.createListing(this.formData).subscribe({
      next: () => {
        this.loadListings();
        this.closeForm();
      },
      error: (err) => {
        this.error = err.error?.message || 'Error al crear alojamiento';
      }
    });
  }

  updateListing() {
    if (!this.editingListing) return;

    this.listingService.updateListing(this.editingListing._id, this.formData).subscribe({
      next: () => {
        this.loadListings();
        this.closeForm();
      },
      error: (err) => {
        this.error = err.error?.message || 'Error al actualizar alojamiento';
      }
    });
  }

  deleteListing(id: string) {
    if (!confirm('¿Estás seguro de eliminar este alojamiento?')) return;

    this.listingService.deleteListing(id).subscribe({
      next: () => {
        this.loadListings();
      },
      error: (err) => {
        this.error = err.error?.message || 'Error al eliminar alojamiento';
      }
    });
  }
}
