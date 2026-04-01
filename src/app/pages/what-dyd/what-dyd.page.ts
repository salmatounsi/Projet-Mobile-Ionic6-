import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup } from '@angular/forms';
import {AuthService} from "../../services/auth-service";
@Component({
  selector: 'app-what-dyd',
  standalone:false,
  templateUrl: './what-dyd.page.html',
  styleUrls: ['./what-dyd.page.scss'],
})
export class WhatDydPage implements OnInit {

  roleForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient,private router: Router, private authService:AuthService) {
    this.roleForm = this.fb.group({
      role: ['']
    });
  }

  onSubmit() {
    const url = 'http://127.0.0.1:5000/role';
    const token = this.authService.getToken();
    const headers = {
      'Authorization': `Bearer ${token}`
    }
    this.http.post(url, this.roleForm.value,{headers:headers}).subscribe({
      next: (res) => {
        console.log('Role saved!', res);
    this.router.navigate(['/signup-experience']);

      },
      error: (err) => {
        console.error('Error saving role', err);
      }
    });
  }

  ngOnInit() {
  }

}
