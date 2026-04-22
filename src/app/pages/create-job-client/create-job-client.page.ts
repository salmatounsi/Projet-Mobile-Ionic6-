import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-job-client',
  standalone: false,
  templateUrl: './create-job-client.page.html',
  styleUrls: ['./create-job-client.page.scss'],
})
export class CreateJobClientPage implements OnInit {

  job = {
    title: '',
    description: '',
    skills: '',
    category: '',
    size: 'medium',
    budgetType: 'hourly',
    budgetFrom: 0,
    budgetTo: 0,
    experienceLevel: '',
    location: ''
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {}

  goBack() { this.location.back(); }

  createJob() {
    const token = localStorage.getItem('token');
    if (!token) { alert('Non authentifié'); return; }

    const headers = { Authorization: `Bearer ${token}` };

    const payload = {
      title: this.job.title,
      description: this.job.description,
      skills: this.job.skills.split(',').map((s: string) => s.trim()).filter(s => s),
      category: this.job.category,
      size: this.job.size,
      budgetType: this.job.budgetType,
      budgetFrom: this.job.budgetFrom,
      budgetTo: this.job.budgetTo,
      experienceLevel: this.job.experienceLevel,
      location: this.job.location
    };

    this.http.post('http://localhost:5000/api/jobs', payload, { headers }).subscribe({
      next: () => { this.router.navigate(['/tabs/jobs']); },
      error: (err) => { console.error(err); alert('Erreur lors de la création'); }
    });
  }
}