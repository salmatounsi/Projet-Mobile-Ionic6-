import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-jobs',
  standalone:false,
  templateUrl: './jobs.page.html',
  styleUrls: ['./jobs.page.scss'],
})
export class JobsPage implements OnInit {

  jobs: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadJobs();
  }

  loadJobs() {
    const token = localStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`
    };

    this.http.get<any[]>('http://localhost:5000/get_jobs', { headers })
      .subscribe({
        next: (data) => {
          this.jobs = data;
        },
        error: (err) => {
          console.error(err);
        }
      });
  }

}
