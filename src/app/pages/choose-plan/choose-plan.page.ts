import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SubscriptionApiService } from '../../services/subscription-api.service';

@Component({
  selector: 'app-choose-plan',
  templateUrl: './choose-plan.page.html',
  styleUrls: ['./choose-plan.page.scss'],
  standalone: false,
})
export class ChoosePlanPage {
  autoRenew = true;
  agreed = false;
  loading = false;

  // TEMP : à remplacer par le vrai userId après login/signup
  private userId = '69a74a3a0b84371d1323a85b';

  constructor(private router: Router, private subscriptionApi: SubscriptionApiService) {}

  continue() {
    if (!this.agreed) {
      alert('Please accept the terms to continue.');
      return;
    }

    this.loading = true;

    this.subscriptionApi.activate(this.userId, this.agreed, this.autoRenew).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigateByUrl('/home');
      },
      error: (err) => {
        this.loading = false;
        console.error(err);
        alert('Activation failed. Check backend server.');
      }
    });
  }
}