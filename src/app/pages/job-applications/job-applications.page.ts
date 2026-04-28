import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationApiService } from '../../services/application-api.service';

@Component({
  selector: 'app-job-applications',
  templateUrl: './job-applications.page.html',
  styleUrls: ['./job-applications.page.scss'],
  standalone: false,
})
export class JobApplicationsPage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private applicationApi = inject(ApplicationApiService);

  jobId = '';
  applications: any[] = [];
  loading = false;

  ngOnInit() {
    this.jobId = this.route.snapshot.paramMap.get('jobId') || '';
    this.loadApplications();
  }

  loadApplications() {
    this.loading = true;

    this.applicationApi.getJobApplications(this.jobId).subscribe({
      next: (res: any[]) => {
        this.applications = res;
        this.loading = false;
      },
      error: (err: any) => {
        this.loading = false;
        console.error('Applications error:', err);
        alert(err.error?.error || 'Erreur lors du chargement des candidatures.');
      }
    });
  }

  formatPriceType(type: string): string {
    switch (type) {
      case 'fixed':
        return 'Prix fixe';
      case 'hourly':
        return 'Paiement horaire';
      default:
        return type || 'Non précisé';
    }
  }

  rejectApplication(applicationId: string) {
    this.applicationApi.rejectApplication(applicationId).subscribe({
      next: () => {
        this.loadApplications();
      },
      error: (err: any) => {
        console.error('Reject error:', err);
        alert(err.error?.error || 'Erreur lors du refus de la candidature.');
      }
    });
  }

  startChat(applicationId: string) {
    this.applicationApi.startChat(applicationId).subscribe({
      next: (res: any) => {
        alert('Conversation lancée avec succès.');
        console.log('Conversation:', res);

        // Plus tard, quand la page chat sera prête :
        // this.router.navigate(['/chat', res.conversation_id]);

        this.router.navigateByUrl('/tabs/messages');
      },
      error: (err: any) => {
        console.error('Start chat error:', err);
        alert(err.error?.error || 'Erreur lors du lancement de la conversation.');
      }
    });
  }
}