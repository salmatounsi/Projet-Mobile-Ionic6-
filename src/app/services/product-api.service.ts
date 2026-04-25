import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth-service';

export interface Product {
  _id?: string;
  id?: string;
  seller_id: string;
  seller_name: string;
  seller_role: string;
  title: string;
  description: string;
  version: string;
  license: string;
  price: number;
  main_image?: string;
  gallery?: string[];
  created_at?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductApiService {
  private apiUrl = 'http://127.0.0.1:5000/api/products';

  private http = inject(HttpClient);
  private authService = inject(AuthService);

  constructor() {}

  getProducts(): Observable<Product[]> {
    const token = this.authService.getToken();

    const headers = {
      Authorization: `Bearer ${token}`
    };

    return this.http.get<Product[]>(this.apiUrl, { headers });
  }

  getMyProducts(): Observable<Product[]> {
    const token = this.authService.getToken();

    const headers = {
      Authorization: `Bearer ${token}`
    };

    return this.http.get<Product[]>(`${this.apiUrl}/my`, { headers });
  }

  createProduct(payload: FormData): Observable<Product> {
    const token = this.authService.getToken();

    const headers = {
      Authorization: `Bearer ${token}`
    };

    return this.http.post<Product>(this.apiUrl, payload, { headers });
  }

  getProductById(id: string): Observable<Product> {
    const token = this.authService.getToken();

    const headers = {
      Authorization: `Bearer ${token}`
    };

    return this.http.get<Product>(`${this.apiUrl}/${id}`, { headers });
  }
}