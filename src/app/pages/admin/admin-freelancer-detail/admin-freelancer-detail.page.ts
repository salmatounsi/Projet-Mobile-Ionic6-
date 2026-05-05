import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-admin-freelancer-detail',
  templateUrl: './admin-freelancer-detail.page.html',
  styleUrls: ['./admin-freelancer-detail.page.scss'],
  standalone: false,
})
export class AdminFreelancerDetailPage implements OnInit {

  freelancer: any  = null;
  actioning        = false;
  showRejectForm   = false;
  rejectReason     = '';
  api = 'http://127.0.0.1:5000/api/admin';

  constructor(
    private route:  ActivatedRoute,
    private http:   HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.loadFreelancer(id);
  }

  getHeaders() {
    const token = localStorage.getItem('token');
    return { headers: new HttpHeaders({ Authorization: `Bearer ${token}` }) };
  }

  loadFreelancer(id: string) {
    this.http.get<any>(`${this.api}/freelancers/${id}`, this.getHeaders())
      .subscribe({
        next:  (res) => this.freelancer = res,
        error: (err) => console.error(err)
      });
  }

  approve() {
    if (this.actioning) return;
    this.actioning = true;
    this.http.put(`${this.api}/freelancers/${this.freelancer.id}/approve`, {}, this.getHeaders())
      .subscribe({
        next: () => {
          this.actioning = false;
          this.freelancer.profile_status = 'approved';
        },
        error: () => { this.actioning = false; }
      });
  }

  reject() {
    if (!this.rejectReason.trim() || this.actioning) return;
    this.actioning = true;
    this.http.put(
      `${this.api}/freelancers/${this.freelancer.id}/reject`,
      { reason: this.rejectReason.trim() },
      this.getHeaders()
    ).subscribe({
      next: () => {
        this.actioning = false;
        this.freelancer.profile_status = 'rejected';
        this.freelancer.reject_reason  = this.rejectReason.trim();
        this.showRejectForm = false;
      },
      error: () => { this.actioning = false; }
    });
  }

  toggleBlock() {
    if (this.actioning) return;
    this.actioning = true;
    this.http.put(
      `${this.api}/users/${this.freelancer.id}/block`,
      {}, this.getHeaders()
    ).subscribe({
      next: (res: any) => {
        this.actioning = false;
        this.freelancer.is_blocked = res.is_blocked;
      },
      error: () => { this.actioning = false; }
    });
  }

  initials(first: string, last: string): string {
    return `${(first || '')[0] || ''}${(last || '')[0] || ''}`.toUpperCase();
  }

  statusLabel(s: string): string {
    return ({ pending: 'En attente', approved: 'Validé', rejected: 'Refusé' } as any)[s] || 'En attente';
  }
}