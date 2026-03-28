import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';



@Component({
  selector: 'app-services',
  templateUrl: './services.page.html',
  standalone:false,
  styleUrls: ['./services.page.scss'],
})
export class ServicesPage implements OnInit {

  services: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.loadServices();
  }
goToCreateService() {
  this.router.navigate(['/create-service']);
}

  loadServices() {
    this.http.get('http://localhost:5000/services')
      .subscribe((data: any) => {
        this.services = data;
        console.log(this.services);
      });
  }
}


