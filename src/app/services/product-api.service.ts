import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  _id?: string;
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

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }
}