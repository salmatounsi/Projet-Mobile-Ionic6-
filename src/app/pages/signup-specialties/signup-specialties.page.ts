import { Component, OnInit } from '@angular/core';
import { SignupDataService } from '../../services/signup-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-specialties',
  templateUrl: './signup-specialties.page.html',
  styleUrls: ['./signup-specialties.page.scss'],
  standalone: false,
})
export class SignupSpecialtiesPage implements OnInit {

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
      open: false,
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

  selectedSpecialties: string[] = [];
  selectedCategory: any = null;
  isLoading = false;

  constructor(
    private api: SignupDataService,
    private router: Router
  ) {}

  ngOnInit() {
    console.log('Signup specialties page loaded');
  }

  toggleCategory(cat: any) {
    this.categories.forEach(c => {
      if (c.id !== cat.id) {
        c.open = false;
      }
    });

    cat.open = !cat.open;
    this.selectedCategory = cat;
  }

  toggleSpecialty(name: string) {
    if (this.selectedSpecialties.includes(name)) {
      this.selectedSpecialties = this.selectedSpecialties.filter(s => s !== name);
    } else {
      this.selectedSpecialties.push(name);
    }
  }

  isSelected(name: string) {
    return this.selectedSpecialties.includes(name);
  }

  next() {
    if (!this.selectedCategory) {
      alert('Veuillez choisir une catégorie.');
      return;
    }

    if (this.selectedSpecialties.length === 0) {
      alert('Veuillez sélectionner au moins une spécialité.');
      return;
    }

    this.isLoading = true;

    this.api.updateCategory(
      this.selectedCategory,
      this.selectedSpecialties
    ).subscribe({
      next: () => {
        this.router.navigateByUrl('/signup-languages');
      },
      error: (err) => {
        console.error('Error saving category:', err);
        alert('Erreur lors de l’enregistrement des spécialités.');
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}