import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choose-plan',
  templateUrl: './choose-plan.page.html',
  styleUrls: ['./choose-plan.page.scss'],
  standalone: false,
})
export class ChoosePlanPage {
  autoRenew = true;
  agreed = false;

  constructor(private router: Router) {}

  continue() {
    // Simulated payment success
    this.router.navigateByUrl('/home');
  }
}