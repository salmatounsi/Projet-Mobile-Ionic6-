import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-admin-jobs',
  templateUrl: './admin-jobs.page.html',
  styleUrls: ['./admin-jobs.page.scss'],
  standalone: false,
})
export class AdminJobsPage implements OnInit {

  jobs:    any[] = [];
  loading = true;
  api = 'http://127.0.0.1:5000/api/admin';

  constructor(private http: HttpClient, private alertCtrl: AlertController) {}

  ngOnInit()         { this.load(); }
  ionViewWillEnter() { this.load(); }

  getHeaders() {
    const token = localStorage.getItem('token');
    return { headers: new HttpHeaders({ Authorization: `Bearer ${token}` }) };
  }

  load() {
    this.loading = true;
    this.http.get<any[]>(`${this.api}/jobs`, this.getHeaders())
      .subscribe({
        next:  (res) => { this.jobs = res || []; this.loading = false; },
        error: ()    => { this.loading = false; }
      });
  }

  async deleteJob(j: any) {
    const alert = await this.alertCtrl.create({
      header:  'Supprimer cette offre ?',
      message: `"${j.title}" sera définitivement supprimée.`,
      buttons: [
        { text: 'Annuler', role: 'cancel' },
        {
          text: 'Supprimer', role: 'destructive',
          handler: () => {
            this.http.delete(`${this.api}/jobs/${j.id}`, this.getHeaders())
              .subscribe({ next: () => this.jobs = this.jobs.filter(x => x.id !== j.id) });
          }
        }
      ]
    });
    await alert.present();
  }
}