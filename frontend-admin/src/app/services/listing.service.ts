import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export interface Listing {
  _id: string;
  title: string;
  description: string;
  address: string;
  pricePerNight: number;
  host: {
    _id: string;
    name: string;
  };
  images: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateListing {
  title: string;
  description: string;
  address: string;
  pricePerNight: number;
  images: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ListingService {
  private apiUrl = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getListings(): Observable<Listing[]> {
    return this.http.get<Listing[]>(`${this.apiUrl}/listings`);
  }

  getListing(id: string): Observable<Listing> {
    return this.http.get<Listing>(`${this.apiUrl}/listings/${id}`);
  }

  createListing(listing: CreateListing): Observable<Listing> {
    return this.http.post<Listing>(`${this.apiUrl}/listings`, listing, {
      headers: this.getHeaders()
    });
  }

  updateListing(id: string, listing: Partial<Listing>): Observable<Listing> {
    return this.http.put<Listing>(`${this.apiUrl}/listings/${id}`, listing, {
      headers: this.getHeaders()
    });
  }

  deleteListing(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/listings/${id}`, {
      headers: this.getHeaders()
    });
  }
}

