import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-messages',
  standalone: false,
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit, OnDestroy {
  conversations: any[] = [];
  filteredConversations: any[] = [];
  searchTerm: string = '';
  private api = 'http://localhost:5000';
  private pollingInterval: any;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadConversations();

    this.pollingInterval = setInterval(() => {
      this.loadConversations();
    }, 5000);
  }

  ngOnDestroy() {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
    }
  }

  loadConversations() {
    const headers = {
      Authorization: `Bearer ${this.authService.getToken()}`
    };

    this.http.get<any[]>(`${this.api}/api/conversations`, { headers }).subscribe({
      next: (data) => {
        this.conversations = data || [];
        this.filterConversations();
      },
      error: (err) => {
        console.error('Load conversations error:', err);
      }
    });
  }

  filterConversations() {
    const term = this.searchTerm.trim().toLowerCase();

    if (!term) {
      this.filteredConversations = [...this.conversations];
      return;
    }

    this.filteredConversations = this.conversations.filter(conv =>
      (conv.other_user_name || '').toLowerCase().includes(term) ||
      (conv.job_title || '').toLowerCase().includes(term)
    );
  }

  onSearch() {
    this.filterConversations();
  }

  openChat(conv: any) {
    this.router.navigate(['/chat', conv.id], {
      state: { contact: conv }
    });
  }

  getInitial(name: string): string {
    if (!name) return 'U';
    return name.trim().charAt(0).toUpperCase();
  }

  formatDate(dateString: string | null): string {
    if (!dateString) return 'Date inconnue';

    const date = new Date(dateString);

    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }

  formatTime(dateString: string | null): string {
    if (!dateString) return '--:--';

    const date = new Date(dateString);

    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}