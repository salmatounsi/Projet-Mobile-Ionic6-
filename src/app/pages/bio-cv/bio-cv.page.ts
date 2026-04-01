import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import {AuthService} from "../../services/auth-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-bio-cv',
  standalone:false,
  templateUrl: './bio-cv.page.html',
  styleUrls: ['./bio-cv.page.scss'],
})
export class BioCvPage implements OnInit {
  file: File | null = null;
  fileName: string | null = null;
  bioText: string = '';

  constructor(private http: HttpClient, private authService:AuthService,private router:Router) {}

  ngOnInit(): void {

  }
  onFileSelected(event: any) {
    this.file = event.target.files[0];
    this.fileName = this.file?.name ?? null;
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('bioText', this.bioText);
    if (this.file) {
      formData.append('file', this.file);
    }
    const token = this.authService.getToken();
    const headers = {
      'Authorization': `Bearer ${token}`
    }
    this.http.post('http://127.0.0.1:5000/bio', formData,{headers:headers, withCredentials: true }).subscribe({
      next: (res) => this.router.navigate(['/profile']),
      error: (err) => console.error(err)
    });
  }

}
