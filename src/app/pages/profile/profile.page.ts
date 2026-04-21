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

  user?: User ;
  constructor() { }

  ngOnInit() {
    console.log("");
    this.profileService.fetchProfileData().subscribe(
      {
        next: (res: any) => {
          this.user = res.profile;
        /*  this.user?.suggestedSkills.push(...[
            { name: 'Clouding & Networking' },
            { name: 'System Administration' },
            { name: 'Mobile Development' },
            { name: 'AI +' }
          ]);*/
          console.log(this.user)
          if (this.user?.education) {
            console.log(this.user?.education[1]?.endDate)
          }
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
