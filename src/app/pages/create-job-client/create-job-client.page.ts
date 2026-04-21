import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-job-client',
  standalone:false,
  templateUrl: './create-job-client.page.html',
  styleUrls: ['./create-job-client.page.scss'],
})
export class CreateJobClientPage implements OnInit {
  job = {
    title: '',
    skills: '',
    size: 'medium',
    budgetType: 'hourly',
    budgetFrom: 7,
    budgetTo: 15
  };

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  createJob() {
  const token = localStorage.getItem('token');

  if (!token) {
    alert('Not authenticated');
    return;
  }

  const headers = {
    Authorization: `Bearer ${token}`
  };

  const payload = {
    title: this.job.title,
    skills: this.job.skills.split(',').map((s: string) => s.trim()),
    size: this.job.size,
    budgetType: this.job.budgetType,
    budgetFrom: this.job.budgetFrom,
    budgetTo: this.job.budgetTo
  };

  this.http.post('http://localhost:5000/api/jobs', payload, { headers })
    .subscribe({
      next: (res: any) => {
        console.log(res);
        alert('Job created successfully');
        this.router.navigate(['/jobs']);
      },
      error: (err) => {
        console.error(err);
        alert('Error creating job');
      }
    });
}
}
