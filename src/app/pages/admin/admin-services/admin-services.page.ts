import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-admin-services',
  templateUrl: './admin-services.page.html',
  styleUrls: ['./admin-services.page.scss'],
  standalone: false,
})
export class AdminServicesPage implements OnInit {

  services: any[] = [];
  loading  = true;
  deleting = '';
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
    this.http.get<any[]>(`${this.api}/services`, this.getHeaders())
      .subscribe({
        next:  (res) => { this.services = res || []; this.loading = false; },
        error: ()    => { this.loading = false; }
      });
  }

  async deleteService(s: any) {
    const alert = await this.alertCtrl.create({
      header:  'Supprimer ce service ?',
      message: `"${s.title}" sera définitivement supprimé.`,
      buttons: [
        { text: 'Annuler', role: 'cancel' },
        {
          text: 'Supprimer', role: 'destructive',
          handler: () => {
            this.deleting = s.id;
            this.http.delete(`${this.api}/services/${s.id}`, this.getHeaders())
              .subscribe({
                next: () => {
                  this.services  = this.services.filter(x => x.id !== s.id);
                  this.deleting  = '';
                },
                error: () => { this.deleting = ''; }
              });
          }
        }
      ]
    });
    await alert.present();
  }
}