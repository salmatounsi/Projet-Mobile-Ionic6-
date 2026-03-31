import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  constructor(private router:Router) {}
  login() {
    console.log('Direction la page de connexion');
  }
  freelancer(){
          this.router.navigate(['/login']);
  }
  ngOnInit() {
  }

}
