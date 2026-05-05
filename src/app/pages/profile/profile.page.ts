import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { User } from '../../models/User';
import { ProfileService } from '../../services/profile-service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false,
})
export class ProfilePage implements OnInit {

  private profileService = inject(ProfileService);
  private router = inject(Router);
  private alertCtrl = inject(AlertController);

  user?: User;

  ngOnInit() {
    this.loadProfile();
  }

  ionViewWillEnter() {
    this.loadProfile();
  }

  loadProfile() {
    this.profileService.fetchProfileData().subscribe({
      next: (res: any) => {
        this.user = res.profile;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  goToEditProfile() {
    this.router.navigateByUrl('/edit-profile');
  }

  async openMenu() {
    const alert = await this.alertCtrl.create({
      cssClass: 'logout-alert',
      header: 'Options',
      message: 'Souhaitez-vous vous déconnecter ?',
      buttons: [
  {
    text: 'Annuler',
    role: 'cancel'
  },
  {
    text: 'Déconnexion',
    cssClass: 'logout-btn',   // 🔥 AJOUT IMPORTANT
    handler: () => this.logout()
  }
]
    });

    await alert.present();
  }

  async confirmLogout() {
    const confirm = await this.alertCtrl.create({
      header: 'Déconnexion',
      message: 'Voulez-vous vraiment vous déconnecter ?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel'
        },
        {
          text: 'Se déconnecter',
          role: 'destructive',
          cssClass: 'logout-alert-btn',
          handler: () => this.logout()
        }
      ]
    });

    await confirm.present();
  }
  statusIcon(): string {
  const status = this.user?.profile_status || 'pending';
  return ({
    pending:  'time-outline',
    approved: 'checkmark-circle-outline',
    rejected: 'close-circle-outline'
  } as any)[status] || 'time-outline';
}

statusMessage(): string {
  const status = this.user?.profile_status || 'pending';
  return ({
    pending:  'Votre profil est en cours de validation par notre équipe.',
    approved: 'Votre profil est validé. Vous pouvez postuler aux offres.',
    rejected: `Profil refusé : ${this.user?.reject_reason || 'Consultez le motif et mettez à jour votre profil.'}`
  } as any)[status] || '';
}

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}