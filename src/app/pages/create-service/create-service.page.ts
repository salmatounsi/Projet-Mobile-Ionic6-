import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-create-service',
  templateUrl: './create-service.page.html',
  standalone: false,
  styleUrls: ['./create-service.page.scss'],
})
export class CreateServicePage implements OnInit {

  service: any = {
    title: '',
    description: '',
    category: '',
    price_basic: null,
    price_standard: null,
    price_premium: null,
    delivery_time: null,
    revisions: null
  };

  featuresInput: string = '';
  selectedFile: File | null = null;
  private api = 'http://localhost:5000';

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  submitService() {
    const formData = new FormData();

    formData.append('title', this.service.title);
    formData.append('description', this.service.description);
    formData.append('category', this.service.category);
    formData.append('price_basic', this.service.price_basic);
    formData.append('price_standard', this.service.price_standard);
    formData.append('price_premium', this.service.price_premium);
    formData.append('delivery_time', this.service.delivery_time);
    formData.append('revisions', this.service.revisions);

    const featuresArray = this.featuresInput.split(',').map(f => f.trim());
    formData.append('features', JSON.stringify(featuresArray));

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    const headers = { Authorization: `Bearer ${this.authService.getToken()}` };

    this.http.post(`${this.api}/services`, formData, { headers }).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigateByUrl('/tabs/services');
      },
      error: (err) => console.error(err)
    });
  }
}