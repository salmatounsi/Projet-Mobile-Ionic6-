import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.page.html',
  styleUrls: ['./project-detail.page.scss'],
  standalone: false,
})
export class ProjectDetailPage implements OnInit {

  projectId = '';
  project: any;
  role = '';

  expandedMilestones: Set<string> = new Set();
  submittingIds: Set<string> = new Set();
  actionIds: Set<string> = new Set();
  validatingIds: Set<string> = new Set();

  // ── Modal nouveau sprint ────────────────────────────────
  showMilestoneModal = false;
  isCreatingMilestone = false;
  newDeliverable = '';
  newMilestone: any = this.emptyMilestone();

  api = 'http://127.0.0.1:5000/api/projects';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.role = localStorage.getItem('role') || '';
    this.projectId = this.route.snapshot.paramMap.get('id')!;
    this.loadProject();
  }

  ionViewWillEnter() {
    this.loadProject();
  }

  getHeaders() {
    const token = localStorage.getItem('token');
    return { headers: new HttpHeaders({ Authorization: `Bearer ${token}` }) };
  }

  loadProject() {
    this.http.get<any>(`${this.api}/${this.projectId}`, this.getHeaders())
      .subscribe({
        next: (res) => {
          this.project = res;
          this.project.milestones.forEach((m: any) => {
            m.newMessage  = m.newMessage  || '';
            m.newProgress = m.newProgress ?? null;
            m.showForm    = m.showForm    || false;
            if (m.updates?.some((u: any) => u.status === 'pending')) {
              this.expandedMilestones.add(m._id);
            }
          });
        },
        error: (err) => console.error(err)
      });
  }

  // ── Accordion ──────────────────────────────────────────
  toggleMilestone(id: string) {
    this.expandedMilestones.has(id)
      ? this.expandedMilestones.delete(id)
      : this.expandedMilestones.add(id);
  }

  isExpanded(id: string) { return this.expandedMilestones.has(id); }

  // ── Form avancement freelancer ─────────────────────────
  toggleForm(m: any) {
    m.showForm = !m.showForm;
    if (!m.showForm) { m.newMessage = ''; m.newProgress = null; }
  }

  canSubmit(m: any): boolean {
    return m.newMessage?.trim()?.length > 0
      && m.newProgress !== null
      && m.newProgress >= 0
      && m.newProgress <= 100;
  }

  submitUpdate(m: any) {
    if (!this.canSubmit(m) || this.submittingIds.has(m._id)) return;
    this.submittingIds.add(m._id);

    this.http.post(
      `${this.api}/${this.projectId}/milestones/${m._id}/update`,
      {
        message:  m.newMessage.trim(),
        progress: Number(m.newProgress),
        status:   'pending'
      },
      this.getHeaders()
    ).subscribe({
      next: () => {
        m.newMessage = ''; m.newProgress = null; m.showForm = false;
        this.submittingIds.delete(m._id);
        this.loadProject();
      },
      error: () => this.submittingIds.delete(m._id)
    });
  }

  // ── Actions client sur update ──────────────────────────
  approveUpdate(m: any, u: any) {
    if (this.actionIds.has(u._id)) return;
    this.actionIds.add(u._id);
    this.http.put(
      `${this.api}/${this.projectId}/milestones/${m._id}/updates/${u._id}/approve`,
      {}, this.getHeaders()
    ).subscribe({
      next: () => { this.actionIds.delete(u._id); this.loadProject(); },
      error: () => this.actionIds.delete(u._id)
    });
  }

  rejectUpdate(m: any, u: any) {
    if (this.actionIds.has(u._id)) return;
    this.actionIds.add(u._id);
    this.http.put(
      `${this.api}/${this.projectId}/milestones/${m._id}/updates/${u._id}/reject`,
      {}, this.getHeaders()
    ).subscribe({
      next: () => { this.actionIds.delete(u._id); this.loadProject(); },
      error: () => this.actionIds.delete(u._id)
    });
  }

  // ── Validation jalon complet (client) ─────────────────
  validateMilestone(m: any) {
    if (this.validatingIds.has(m._id)) return;
    this.validatingIds.add(m._id);
    this.http.put(
      `${this.api}/${this.projectId}/milestones/${m._id}/validate`,
      {}, this.getHeaders()
    ).subscribe({
      next: () => { this.validatingIds.delete(m._id); this.loadProject(); },
      error: () => this.validatingIds.delete(m._id)
    });
  }

  // ── Modal nouveau sprint ───────────────────────────────
  emptyMilestone() {
    return {
      title:        '',
      description:  '',
      amount:       null,
      duration:     '',
      deliverables: [] as string[]
    };
  }

  openMilestoneModal() {
    this.newMilestone    = this.emptyMilestone();
    this.newDeliverable  = '';
    this.showMilestoneModal = true;
  }

  closeMilestoneModal() {
    this.showMilestoneModal = false;
  }

  addDeliverable() {
    const val = this.newDeliverable.trim();
    if (!val) return;
    this.newMilestone.deliverables.push(val);
    this.newDeliverable = '';
  }

  removeDeliverable(i: number) {
    this.newMilestone.deliverables.splice(i, 1);
  }

  canSubmitMilestone(): boolean {
    return this.newMilestone.title.trim().length > 0;
  }

  submitMilestone() {
    if (!this.canSubmitMilestone() || this.isCreatingMilestone) return;
    this.isCreatingMilestone = true;

    const payload: any = {
      title:        this.newMilestone.title.trim(),
      description:  this.newMilestone.description.trim(),
      amount:       Number(this.newMilestone.amount) || 0,
      duration:     this.newMilestone.duration.trim(),
      deliverables: this.newMilestone.deliverables
    };

    this.http.post(
      `${this.api}/${this.projectId}/milestones`,
      payload,
      this.getHeaders()
    ).subscribe({
      next: () => {
        this.isCreatingMilestone  = false;
        this.showMilestoneModal   = false;
        this.loadProject();
      },
      error: () => { this.isCreatingMilestone = false; }
    });
  }

  // ── Helpers ────────────────────────────────────────────
  pendingCount(m: any): number {
    return m.updates?.filter((u: any) => u.status === 'pending').length || 0;
  }

  canValidateMilestone(m: any): boolean {
    return m.status !== 'validated'
      && m.progress > 0
      && !m.updates?.some((u: any) => u.status === 'pending');
  }

  statusLabel(s: string): string {
    return ({
      pending:     'En attente',
      approved:    'Validé',
      rejected:    'Refusé',
      in_progress: 'En cours',
      validated:   'Validé ✓',
      not_started: 'Non démarré'
    } as any)[s] || s;
  }

  isSubmitting(id: string) { return this.submittingIds.has(id); }
  isActioning(id: string)  { return this.actionIds.has(id); }
  isValidating(id: string) { return this.validatingIds.has(id); }
}