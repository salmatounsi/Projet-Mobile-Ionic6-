import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-what-dyd',
  standalone:false,
  templateUrl: './what-dyd.page.html',
  styleUrls: ['./what-dyd.page.scss'],
})
export class WhatDydPage implements OnInit {

  roleForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient,private router: Router) {
    this.roleForm = this.fb.group({
      role: ['']
    });
  }

  onSubmit() {
    const url = 'http://127.0.0.1:5000/role';
    this.http.post(url, this.roleForm.value).subscribe({
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
