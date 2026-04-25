import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bio-cv',
  standalone: false,
  templateUrl: './bio-cv.page.html',
  styleUrls: ['./bio-cv.page.scss'],
})
export class BioCvPage implements OnInit {
  file: File | null = null;
  fileName: string | null = null;
  bioText: string = '';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onFileSelected(event: any) {
    this.file = event.target.files[0];
    this.fileName = this.file?.name ?? null;
  }

  onSubmit() {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No token found');
      alert('Session expirée. Veuillez vous reconnecter.');
      this.router.navigateByUrl('/login');
      return;
    }

    const formData = new FormData();
    formData.append('bioText', this.bioText || '');

    if (this.file) {
      formData.append('file', this.file);
    }

    const headers = {
      Authorization: `Bearer ${token}`
    };

    this.http.post('http://localhost:5000/bio', formData, { headers })
      .subscribe({
        next: (res) => {
          console.log('Bio saved:', res);

          // prochaine étape du signup freelancer
          this.router.navigateByUrl('/signup-experience');
        },
        error: (err) => {
          console.error('Bio error:', err);
          alert('Erreur lors de l’enregistrement de la bio.');
        }
      });
  }
}