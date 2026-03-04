import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-general-info',
  standalone:false,
  templateUrl: './general-info.page.html',
  styleUrls: ['./general-info.page.scss'],
})
export class GeneralInfoPage implements OnInit {

  registerForm: FormGroup;

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

  onSubmit() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);

      this.http.post('http://127.0.0.1:5000/register', this.registerForm.value,{ withCredentials: true })
        .subscribe(response => {
          console.log('Success:', response);
          this.router.navigate(['/bio-cv']);

        }, error => {
          console.error('Error:', error);
        });
    }
  }


}
