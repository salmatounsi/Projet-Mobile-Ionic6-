import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.page.html',
  styleUrls: ['./create-project.page.scss'],
  standalone: false,
})
export class CreateProjectPage implements OnInit {

  // ── Navigation entre étapes ──────────────────────────────
  step = 1;

  // ── Étape 1 : candidatures ───────────────────────────────
  applications: any[]       = [];
  loadingApplications       = true;
  selectedApplication: any  = null;

  // ── Étape 2 : formulaire projet ──────────────────────────
  form = {
    title:       '',
    description: '',
    budget:      null as number | null,
    deadline:    ''
  };

  isSubmitting = false;

  api    = 'http://127.0.0.1:5000/api';

  constructor(
    private http: HttpClient,
    private navCtrl: NavController
  ) {}

 ngOnInit() {
  const role = localStorage.getItem('role') || '';

  if (role !== 'client') {
    // Freelancer ne doit pas accéder à cette page
    this.navCtrl.navigateBack('/projects');
    return;
  }

  this.loadAcceptedApplications();
}

  getHeaders() {
    const token = localStorage.getItem('token');
    return { headers: new HttpHeaders({ Authorization: `Bearer ${token}` }) };
  }

  // ── Étape 1 ───────────────────────────────────────────────

  loadAcceptedApplications() {
    this.loadingApplications = true;
    this.http.get<any[]>(`${this.api}/applications/accepted`, this.getHeaders())
      .subscribe({
        next: (res) => {
          this.applications        = res || [];
          this.loadingApplications = false;
        },
        error: (err) => {
          console.error('Erreur chargement candidatures:', err);
          this.loadingApplications = false;
        }
      });
  }

  selectApplication(a: any) {
    this.selectedApplication = a;
  }

  goToStep2() {
    if (!this.selectedApplication) return;

    // Pré-remplir le budget avec le prix proposé par le freelancer
    this.form.budget = Number(this.selectedApplication.proposed_price) || null;

    // Pré-remplir le titre avec le titre du job
    if (!this.form.title) {
      this.form.title = this.selectedApplication.job_title || '';
    }

    this.step = 2;
  }

  // ── Étape 2 ───────────────────────────────────────────────

  canSubmit(): boolean {
    return this.form.title.trim().length > 0
      && this.selectedApplication !== null;
  }

  submitProject() {
    if (!this.canSubmit() || this.isSubmitting) return;
    this.isSubmitting = true;

    const payload = {
      title:          this.form.title.trim(),
      description:    this.form.description.trim(),
      budget:         Number(this.form.budget) || 0,
      deadline:       this.form.deadline,
      freelancer_id:  this.selectedApplication.freelancer_id,
      application_id: this.selectedApplication.id
    };

    this.http.post<any>(`${this.api}/projects`, payload, this.getHeaders())
      .subscribe({
        next: (res) => {
          this.isSubmitting = false;
          // Naviguer vers le détail du projet créé
          this.navCtrl.navigateForward(`/project-detail/${res.project_id}`);
        },
        error: (err) => {
          this.isSubmitting = false;
          console.error('Erreur création projet:', err);

          // Si le projet existe déjà, naviguer vers lui
          if (err.status === 409 && err.error?.project_id) {
            this.navCtrl.navigateForward(`/project-detail/${err.error.project_id}`);
          }
        }
      });
  }

  // ── Helpers ───────────────────────────────────────────────

  initials(name: string): string {
    if (!name) return '?';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }
}