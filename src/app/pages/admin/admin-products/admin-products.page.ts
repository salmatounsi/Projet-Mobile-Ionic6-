import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.page.html',
  styleUrls: ['./admin-products.page.scss'],
  standalone: false,
})
export class AdminProductsPage implements OnInit {

  products: any[] = [];
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
    this.http.get<any[]>(`${this.api}/products`, this.getHeaders())
      .subscribe({
        next:  (res) => { this.products = res || []; this.loading = false; },
        error: ()    => { this.loading = false; }
      });
  }

  async deleteProduct(p: any) {
    const alert = await this.alertCtrl.create({
      header:  'Supprimer ce produit ?',
      message: `"${p.title}" sera définitivement supprimé.`,
      buttons: [
        { text: 'Annuler', role: 'cancel' },
        {
          text: 'Supprimer', role: 'destructive',
          handler: () => {
            this.deleting = p.id;
            this.http.delete(`${this.api}/products/${p.id}`, this.getHeaders())
              .subscribe({
                next: () => {
                  this.products = this.products.filter(x => x.id !== p.id);
                  this.deleting = '';
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