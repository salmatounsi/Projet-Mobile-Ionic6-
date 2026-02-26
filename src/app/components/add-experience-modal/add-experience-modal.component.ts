import { Component, OnInit } from '@angular/core';
import {ModalController} from "@ionic/angular";
import {FormBuilder, Validators} from "@angular/forms";
import { inject } from '@angular/core';

@Component({
  selector: 'app-add-experience-modal',
  templateUrl: './add-experience-modal.component.html',
  styleUrls: ['./add-experience-modal.component.scss'],
  standalone: false,


})
export class AddExperienceModalComponent  implements OnInit {
  private modalCtrl = inject(ModalController);
  private fb = inject(FormBuilder);
  form = this.fb.group({
    title: ['', Validators.required],
    company: ['', Validators.required],
    location: ['', Validators.required],
    country: ['', Validators.required],
    startDate: ['', Validators.required],
    endDate: [''],
    currentlyInRole: [false],
  });

  constructor(

  ) {}

  close() {
    this.modalCtrl.dismiss();
  }

  save() {
    if (this.form.valid) {
      this.modalCtrl.dismiss(this.form.value);
    }
  }


  ngOnInit() {}

}
