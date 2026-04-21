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
    const headers = { Authorization: `Bearer ${this.authService.getToken()}` };
    this.http.get<any[]>(`${this.api}/conversations`, { headers }).subscribe({
      next: (data) => {
        this.conversations = data.sort((a, b) => {
          const datetimeA = `${a.lastDate || '01/01'} ${a.lastTime || '00:00'}`;
          const datetimeB = `${b.lastDate || '01/01'} ${b.lastTime || '00:00'}`;
          return datetimeB.localeCompare(datetimeA);
        });
        this.filteredConversations = [...this.conversations];
        this.filterConversations();
      },
      error: (err) => console.error(err)
    });
  }

  filterConversations() {
    if (!this.searchTerm) {
      this.filteredConversations = [...this.conversations];
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredConversations = this.conversations.filter(c =>
        c.name.toLowerCase().includes(term)
      );
    }
  }

  onSearch() {
    this.filterConversations();
  }

  openChat(conv: any) {
    this.router.navigate(['/chat', conv.id], {
      state: { contact: conv }
    });
  }
}