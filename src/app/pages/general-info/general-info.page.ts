import {Component, inject, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {AuthService} from "../../services/auth-service";
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';


@Component({
  selector: 'app-general-info',
  standalone:false,
  templateUrl: './general-info.page.html',
  styleUrls: ['./general-info.page.scss'],
})
export class GeneralInfoPage implements OnInit {
photoDataUrl: string | null = null;
registerForm: FormGroup; 
 async takePhoto() {
    const image = await Camera.getPhoto({
      quality: 80,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });
    this.photoDataUrl = image.dataUrl!;
  }

  async pickImage() {
    const image = await Camera.getPhoto({
      quality: 80,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Photos
    });
    this.photoDataUrl = image.dataUrl!;
  }
  private blob ?: Blob;
  private formData ?: FormData;
  upload() {
    if (!this.photoDataUrl) return;

    this.blob = this.dataUrlToBlob(this.photoDataUrl);
    this.formData = new FormData();
    this.formData.append('file', this.blob, 'photo.jpg');
   
  }

  private dataUrlToBlob(dataUrl: string): Blob {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }
  constructor(private fb: FormBuilder, private http: HttpClient,  private router: Router
) {

    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      country: ['', Validators.required],
      terms: [false, Validators.requiredTrue]
    });
  }
  ngOnInit(): void {

  }
  authService = inject(AuthService);
  onSubmit() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);

      this.http.post('http://127.0.0.1:5000/register', this.registerForm.value,{ withCredentials: true })
        .subscribe((response:any) => {
          console.log('Success:', response);
          this.authService.setToken(response.token);
           const headers = {
          'Authorization': `Bearer ${response.token}`
          }
           this.http.post('http://127.0.0.1:5000/register/upload', this.formData, { headers })
          .subscribe({
          next: res => console.log('Upload success', res),
          error: err => console.error('Upload failed', err)
          });
          this.router.navigate(['/what-dyd']);

        }, error => {
          console.error('Error:', error);
        });
    }
  }


}
