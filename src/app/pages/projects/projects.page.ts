import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.page.html',
  styleUrls: ['./projects.page.scss'],
  standalone: false,
})
export class ProjectsPage implements OnInit {

  projects: any[] = [];
  filteredProjects: any[] = [];

  searchTerm: string = '';
  selectedStatus: string = 'all';

  role: string = '';
  stats = {
    total: 0,
    active: 0,
    completed: 0
  };

  api = 'http://127.0.0.1:5000/api/projects';

  constructor(
    private http: HttpClient,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
  this.role = localStorage.getItem('role') || '';
  this.loadProjects();
}

  
  getHeaders() {
    const token = localStorage.getItem('token');

    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token || ''}`
      })
    };
  }

  // 📦 LOAD PROJECTS
  loadProjects() {
    this.http.get<any[]>(`${this.api}/my`, this.getHeaders())
      .subscribe({
        next: (res) => {
          this.projects = res || [];
          this.applyFilters();
          this.computeStats();
        },
        error: (err) => {
          console.error('Error loading projects:', err);
        }
      });
  }

  // 🔍 SEARCH
  onSearchChange() {
    this.applyFilters();
  }

  // 🎯 FILTER STATUS
  filterByStatus() {
    this.applyFilters();
  }

  // 🔁 GLOBAL FILTER (SEARCH + STATUS)
  applyFilters() {
    const term = this.searchTerm.toLowerCase();

    this.filteredProjects = this.projects.filter(p => {

      const matchesSearch =
        (p.title || '').toLowerCase().includes(term);

      const matchesStatus =
        this.selectedStatus === 'all' ||
        p.status === this.selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }

  // 📊 STATS
  computeStats() {
    this.stats.total = this.projects.length;

    this.stats.active = this.projects.filter(
      p => p.status === 'active'
    ).length;

    this.stats.completed = this.projects.filter(
      p => p.status === 'completed'
    ).length;
  }

  // 🔗 NAVIGATION
  openProject(p: any) {
    this.navCtrl.navigateForward(`/project-detail/${p._id}`);
  }

  createProject() {
    this.navCtrl.navigateForward('/create-project');
  }

}