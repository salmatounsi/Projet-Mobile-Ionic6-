import {Component, inject, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-education-modal',
  templateUrl: './add-education-modal.component.html',
  styleUrls: ['./add-education-modal.component.scss'],
  standalone: false,
})
export class AddEducationModalComponent  implements OnInit {
  private modalCtrl = inject(ModalController);
  private fb = inject(FormBuilder);
  form = this.fb.group({
    school: ['', Validators.required],
    degree: ['', Validators.required],
    field: ['', Validators.required],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
    description: [''],
  });



  close() {
    this.modalCtrl.dismiss();
  }

  save() {
    if (this.form.valid) {
      this.modalCtrl.dismiss(this.form.value);
    }
  }
  constructor() { }

  ngOnInit() {}

}
