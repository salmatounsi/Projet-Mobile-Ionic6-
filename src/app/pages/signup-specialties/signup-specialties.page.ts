import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup-specialties',
  templateUrl: './signup-specialties.page.html',
  styleUrls: ['./signup-specialties.page.scss'],
  standalone: false,
})
export class SignupSpecialtiesPage implements OnInit {

  constructor() { }
  categories = [
    {
      id: 1,
      name: 'Accounting & Consulting',
      open: false,
      specialties: [
        'Accounting',
        'Financial Planning',
        'Management Consulting',
        'Tax Preparation'
      ]
    },
    {
      id: 2,
      name: 'Admin Support',
      open: false,
      specialties: [
        'Data Entry',
        'Virtual Assistance',
        'Project Management',
        'Web Research'
      ]
    },
    {
      id: 3,
      name: 'IT & Networking',
      open: true,
      specialties: [
        'Database Management & Administration',
        'ERP / CRM Software',
        'Information Security',
        'Network & System Administration',
        'DevOps & Cloud',
        'Technical Support'
      ]
    },
    {
      id: 4,
      name: 'Engineering & Architecture',
      open: false,
      specialties: [
        'Civil Engineering',
        'Mechanical Engineering',
        'Electrical Engineering',
        '3D Modeling & CAD'
      ]
    },
    {
      id: 5,
      name: 'Design & Creative',
      open: false,
      specialties: [
        'UI/UX Design',
        'Graphic Design',
        'Video Editing',
        'Animation',
        'Brand Identity'
      ]
    },
    {
      id: 6,
      name: 'Writing & Translation',
      open: false,
      specialties: [
        'Article Writing',
        'Copywriting',
        'Technical Writing',
        'Translation',
        'Proofreading'
      ]
    },
    {
      id: 7,
      name: 'Sales & Marketing',
      open: false,
      specialties: [
        'Digital Marketing',
        'SEO',
        'Social Media Marketing',
        'Lead Generation',
        'Email Marketing'
      ]
    }
  ];
  ngOnInit() {

  }
  selectedSpecialties: string[] = [];

  toggleCategory(cat: any) {
    cat.open = !cat.open;
  }

  toggleSpecialty(name: string) {
    if (this.selectedSpecialties.includes(name)) {
      this.selectedSpecialties =
        this.selectedSpecialties.filter(s => s !== name);
    } else {
      this.selectedSpecialties.push(name);
    }
  }

  isSelected(name: string) {
    return this.selectedSpecialties.includes(name);
  }
}
