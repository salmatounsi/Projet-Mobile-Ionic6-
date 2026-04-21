import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private baseUrl = 'http://localhost:5000/';
  private http= inject(HttpClient);

  getSamples():Observable<any>{
    return this.http.get(
      `${this.baseUrl}/samples`);
  }
}
