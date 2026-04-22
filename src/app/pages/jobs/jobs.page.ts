import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-jobs',
  standalone: false,
  templateUrl: './jobs.page.html',
  styleUrls: ['./jobs.page.scss'],
})
export class JobsPage implements OnInit {

  jobs: any[] = [];
  filteredJobs: any[] = [];
  searchTerm: string = '';
  private api = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  ngOnInit() { this.loadJobs(); }

  loadJobs() {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    this.http.get<any[]>(`${this.api}/get_jobs`, { headers }).subscribe({
      next: (data) => {
        this.jobs = data;
        this.filteredJobs = [...data];
      },
      error: (err) => console.error(err)
    });
  }

  onSearch() {
    if (!this.searchTerm) {
      this.filteredJobs = [...this.jobs];
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredJobs = this.jobs.filter(j =>
        j.title?.toLowerCase().includes(term) ||
        j.category?.toLowerCase().includes(term) ||
        j.skills?.some((s: string) => s.toLowerCase().includes(term))
      );
    }
  }
}