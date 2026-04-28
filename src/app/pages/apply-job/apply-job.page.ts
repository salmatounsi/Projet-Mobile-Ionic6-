import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationApiService } from '../../services/application-api.service';

@Component({
  selector: 'app-apply-job',
  templateUrl: './apply-job.page.html',
  styleUrls: ['./apply-job.page.scss'],
  standalone: false,
})
export class ApplyJobPage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private applicationApi = inject(ApplicationApiService);

  jobId = '';

  proposalTitle = '';
  coverLetter = '';
  understanding = '';
  approach = '';

  deliverableInput = '';
  deliverables: string[] = [];

  proposedPrice: number | null = null;
  priceType = 'fixed';
  estimatedDuration = '';
  availability = '';

  questionInput = '';
  questions: string[] = [];

  useProfileCv = true;
  attachment: File | null = null;
  attachmentName = '';

  loading = false;

  ngOnInit() {
    this.jobId = this.route.snapshot.paramMap.get('jobId') || '';
  }

  addDeliverable() {
    const value = this.deliverableInput.trim();

    if (!value) {
      return;
    }

    this.deliverables.push(value);
    this.deliverableInput = '';
  }

  removeDeliverable(index: number) {
    this.deliverables.splice(index, 1);
  }

  addQuestion() {
    const value = this.questionInput.trim();

    if (!value) {
      return;
    }

    this.questions.push(value);
    this.questionInput = '';
  }

  removeQuestion(index: number) {
    this.questions.splice(index, 1);
  }

  onAttachmentSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    this.attachment = input.files[0];
    this.attachmentName = this.attachment.name;
  }

  submitApplication() {
    if (!this.proposalTitle || !this.coverLetter || !this.proposedPrice) {
      alert('Veuillez remplir au moins le titre, le message et le prix proposé.');
      return;
    }

    this.loading = true;

    const formData = new FormData();

    formData.append('proposal_title', this.proposalTitle);
    formData.append('cover_letter', this.coverLetter);
    formData.append('understanding', this.understanding);
    formData.append('approach', this.approach);
    formData.append('deliverables', JSON.stringify(this.deliverables));

    formData.append('proposed_price', String(this.proposedPrice));
    formData.append('price_type', this.priceType);
    formData.append('estimated_duration', this.estimatedDuration);
    formData.append('availability', this.availability);

    formData.append('questions', JSON.stringify(this.questions));
    formData.append('use_profile_cv', String(this.useProfileCv));

    if (this.attachment) {
      formData.append('attachment', this.attachment);
    }

    this.applicationApi.applyToJob(this.jobId, formData).subscribe({
      next: () => {
        this.loading = false;
        alert('Votre candidature a été envoyée avec succès.');
        this.router.navigateByUrl('/jobs');
      },
      error: (err: any) => {
        this.loading = false;
        console.error('Apply error:', err);
        alert(err.error?.error || 'Erreur lors de l’envoi de la candidature.');
      }
    });
  }
}