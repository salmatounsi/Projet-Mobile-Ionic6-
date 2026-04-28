import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-chat',
  standalone: false,
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit, OnDestroy {
  conversationId: string = '';
  contact: any = null;
  messages: any[] = [];
  newMessage: string = '';

  private api = 'http://localhost:5000';
  private pollingInterval: any;
  currentUserId: string = '';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.conversationId = this.route.snapshot.paramMap.get('id') || '';
    this.contact = history.state?.contact || null;
    this.currentUserId = this.getUserIdFromToken();
    this.loadMessages();

    this.pollingInterval = setInterval(() => {
      this.loadMessages();
    }, 3000);
  }

  ngOnDestroy() {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
    }
  }

  loadMessages() {
    const headers = {
      Authorization: `Bearer ${this.authService.getToken()}`
    };

    this.http.get<any[]>(`${this.api}/api/conversations/${this.conversationId}/messages`, { headers })
      .subscribe({
        next: (data) => {
          this.messages = data || [];
        },
        error: (err) => {
          console.error('Load messages error:', err);
        }
      });
  }

  sendMessage() {
    const text = this.newMessage.trim();

    if (!text) return;

    const headers = {
      Authorization: `Bearer ${this.authService.getToken()}`
    };

    this.http.post(`${this.api}/api/conversations/${this.conversationId}/messages`, {
      text: text
    }, { headers }).subscribe({
      next: () => {
        this.newMessage = '';
        this.loadMessages();
      },
      error: (err) => {
        console.error('Send message error:', err);
      }
    });
  }

  isMine(message: any): boolean {
    return message.sender_id === this.currentUserId;
  }

 private parseDate(value: any): Date | null {
  if (!value) {
    return null;
  }

  if (value instanceof Date) {
    return isNaN(value.getTime()) ? null : value;
  }

  if (typeof value === 'string') {
    const date = new Date(value);
    return isNaN(date.getTime()) ? null : date;
  }

  if (typeof value === 'number') {
    const date = new Date(value);
    return isNaN(date.getTime()) ? null : date;
  }

  if (value.$date) {
    const date = new Date(value.$date);
    return isNaN(date.getTime()) ? null : date;
  }

  return null;
}

formatDate(value: any): string {
  const date = this.parseDate(value);

  if (!date) {
    return 'Date non disponible';
  }

  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
}

formatTime(value: any): string {
  const date = this.parseDate(value);

  if (!date) {
    return '--:--';
  }

  return date.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit'
  });
}

getStartedAt(): string {
  const date = this.parseDate(this.contact?.createdAt);

  if (!date) {
    return 'date non disponible';
  }

  return `${this.formatDate(date)} à ${this.formatTime(date)}`;
}

shouldShowDateSeparator(index: number): boolean {
  if (index === 0) {
    return true;
  }

  const currentDate = this.parseDate(this.messages[index]?.createdAt);
  const previousDate = this.parseDate(this.messages[index - 1]?.createdAt);

  if (!currentDate || !previousDate) {
    return false;
  }

  return currentDate.toDateString() !== previousDate.toDateString();
}

 

getInitial(name: string): string {
    if (!name) return 'C';
    return name.trim().charAt(0).toUpperCase();
  }

goBack() {
  this.router.navigateByUrl('/tabs/messages');
}

getUserIdFromToken(): string {
  const token = this.authService.getToken();

  if (!token) {
    return '';
  }

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.sub || '';
  } catch (error) {
    console.error('Token decode error:', error);
    return '';
  }
}

}