import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  user?: User;

  constructor() {}

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
        console.log(this.user);
      },
      error: (err) => {
        if (err.status === 404) {
          console.log('user data not found');
        } else if (err.status === 401) {
          console.log('Unauthorized');
        } else {
          console.log('Failed');
        }

        console.log(err);
      }
    });
  }

  goToEditProfile() {
    this.router.navigateByUrl('/edit-profile');
  }
}