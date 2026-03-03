import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bio-cv',
  standalone:false,
  templateUrl: './bio-cv.page.html',
  styleUrls: ['./bio-cv.page.scss'],
})
export class BioCvPage implements OnInit {
  fileName: string = "";
  constructor() { }

  ngOnInit() {
  }
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      console.log("Fichier sélectionné:", file.name);
    }
  }

}
