import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-chat',
  standalone: false,
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  @ViewChild(IonContent) content!: IonContent;

  contact: any = { name: 'Conversation', role: '' };
  messages: any[] = [];
  groupedMessages: { date: string, msgs: any[] }[] = [];
  newMessage: string = '';
  conversationId: string = '';
  private api = 'http://localhost:5000';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras?.state?.['contact']) {
      this.contact = nav.extras.state['contact'];
    }
  }

  ngOnInit() {
    this.conversationId = this.route.snapshot.paramMap.get('id') || '';
    if (this.conversationId) {
      this.loadMessages();
    }
  }

  loadMessages() {
    const headers = { Authorization: `Bearer ${this.authService.getToken()}` };
    this.http.get<any[]>(
      `${this.api}/conversations/${this.conversationId}/messages`,
      { headers }
    ).subscribe({
      next: (data) => {
        this.messages = data;
        this.groupMessages();
        setTimeout(() => this.scrollToBottom(), 100);
      },
      error: (err) => console.error(err)
    });
  }

  groupMessages() {
    const groups: { [key: string]: any[] } = {};
    for (const msg of this.messages) {
      const key = msg.date || 'Aujourd\'hui';
      if (!groups[key]) groups[key] = [];
      groups[key].push(msg);
    }
    this.groupedMessages = Object.keys(groups).map(date => ({
      date,
      msgs: groups[date]
    }));
  }

  sendMessage() {
    if (!this.newMessage.trim()) return;
    const headers = { Authorization: `Bearer ${this.authService.getToken()}` };
    const body = { text: this.newMessage.trim() };
    this.http.post(
      `${this.api}/conversations/${this.conversationId}/messages`,
      body, { headers }
    ).subscribe({
      next: (msg: any) => {
        this.messages.push(msg);
        this.groupMessages();
        this.newMessage = '';
        setTimeout(() => this.scrollToBottom(), 100);
      },
      error: (err) => console.error(err)
    });
  }

  scrollToBottom() {
    if (this.content) {
      this.content.scrollToBottom(300);
    }
  }
}