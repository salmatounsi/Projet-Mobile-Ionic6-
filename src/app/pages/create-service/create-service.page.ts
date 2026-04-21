import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-service',
  standalone:false,
  templateUrl: './create-service.page.html',
  styleUrls: ['./create-service.page.scss'],
})
export class CreateServicePage implements OnInit {

  service:any = {
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
selectedFile: File| null = null;

 constructor(private http: HttpClient,private router:Router) { }

  ngOnInit() {
  }

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

  // transformer les features
  const featuresArray = this.featuresInput.split(',').map(f => f.trim());
  formData.append('features', JSON.stringify(featuresArray));

  if (this.selectedFile) {
    formData.append('image', this.selectedFile);
  }

  this.http.post('http://localhost:5000/services', formData)
    .subscribe(res => {
      console.log(res);
    });
    this.router.navigate(['/freelancer-services']);
}
 



}
