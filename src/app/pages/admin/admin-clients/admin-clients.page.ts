import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-admin-clients',
  templateUrl: './admin-clients.page.html',
  styleUrls: ['./admin-clients.page.scss'],
  standalone: false,
})
export class AdminClientsPage implements OnInit {

  clients:  any[] = [];
  loading   = true;
  actioning = '';
  api = 'http://127.0.0.1:5000/api/admin';

  constructor(private http: HttpClient) {}

  ngOnInit()         { this.load(); }
  ionViewWillEnter() { this.load(); }

  getHeaders() {
    const token = localStorage.getItem('token');
    return { headers: new HttpHeaders({ Authorization: `Bearer ${token}` }) };
  }

  load() {
    this.loading = true;
    this.http.get<any[]>(`${this.api}/clients`, this.getHeaders())
      .subscribe({
        next:  (res) => { this.clients = res || []; this.loading = false; },
        error: ()    => { this.loading = false; }
      });
  }

  toggleBlock(c: any) {
    if (this.actioning) return;
    this.actioning = c.id;
    this.http.put(`${this.api}/users/${c.id}/block`, {}, this.getHeaders())
      .subscribe({
        next: (res: any) => {
          c.is_blocked   = res.is_blocked;
          this.actioning = '';
        },
        error: () => { this.actioning = ''; }
      });
  }

  initials(first: string, last: string): string {
    return `${(first || '')[0] || ''}${(last || '')[0] || ''}`.toUpperCase();
  }
}