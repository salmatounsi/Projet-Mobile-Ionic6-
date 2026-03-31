import {Component, inject, OnInit} from '@angular/core';
import {User} from "../../models/User";
import {ProfileService} from "../../services/profile-service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false,
})
export class ProfilePage implements OnInit {
  private profileService = inject(ProfileService);

  user: User = {
    _id: '123',

    email: 'john@example.com',
    password: '',
    role: 'developer',

    created_at: new Date().toISOString(),

    current_step: 7,
    signup_completed: true,
    payment_completed: true,

    general_info: {
      first_name: 'John',
      last_name: 'Doe',
      city: 'Tunis',
      country: 'Tunisia'
    },

    professional_role: 'Full Stack Developer',

    experiences: [
      {
        title: 'Frontend Developer',
        company: 'BlueWave',
        location: 'Tunis',
        start_date: '2023',
        end_date: '2024'
      }
    ],

    education: [
      {
        institution: 'ENSIT',
        degree: 'Engineering',
        field: 'Software Engineering',
        start_date: '2023',
        end_date: '2025'
      }
    ],

    skills: [
      {name: 'Angular'},
      {name: 'Spring Boot'}
    ],

    categories: {
      main: 'IT & Networking',
      sub_categories: ['Database', 'System Administration']
    },

    languages: [
      {
        name: 'French',
        level: 'Fluent'
      }
    ],

    bio: 'Full stack developer',

    cv_url: '',

    subscription_plan: 'premium',
    earnings: 0,
    suggestedSkills: [
      { name: 'Clouding & Networking' },
      { name: 'System Administration' },
      { name: 'Mobile Development' },
      { name: 'AI +' }
    ],
  };
  constructor() { }

  ngOnInit() {
    console.log("");
    this.profileService.fetchProfileData().subscribe(
      {
        next: (res: any) => {
          this.user = res;
          console.log(this.user)
        },
        error: (err) => {
          if (err.status === 404) {
           console.log("user data not found")
          }
          else if (err.status === 401) {
            console.log("Unauthorized")
          }

          else {
            console.log("Failed");
          }
          console.log(err);
        }

      }
    )

  }

}
