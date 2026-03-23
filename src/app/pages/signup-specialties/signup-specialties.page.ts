import {Component, inject, OnInit} from '@angular/core';
import {SignupDataService} from "../../services/signup-data.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-signup-specialties',
  templateUrl: './signup-specialties.page.html',
  styleUrls: ['./signup-specialties.page.scss'],
  standalone: false,
})
export class SignupSpecialtiesPage implements OnInit {
  private route = inject(ActivatedRoute);

  constructor(
    private api: SignupDataService,
    private router: Router
  ) {}

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
  ngOnInit() {
    const idFromUrl = this.route.snapshot.paramMap.get('id');

    if (idFromUrl) {
      this.api.userId = idFromUrl;
      console.log('Successfully read ID from URL:', this.api.userId);
    } else {
      console.error('No ID found in the URL path!');
    }


    if (this.api.userId) {
      this.loadSavedData(this.api.userId); // New helper function
    } else {
      console.error('No ID found in the URL path!');
    }
   /* const nav = this.router.getCurrentNavigation();
    if (nav?.extras?.state && nav.extras.state['userId']) {
      this.api.userId = nav.extras.state['userId'];*/
   // this.api.userId = "69a74a3a0b84371d1323a85b";
   /* } else {
      console.error('No userId found in router state!');
    }*/
  }

  loadSavedData(userId: string) {
    this.api.getCategory(userId).subscribe({
      next: (res) => {
        if (res) {
          this.selectedSpecialties = res.specialties || [];
          const savedCategoryId = res.category?.id;
          const matchedCat = this.categories.find(c => c.id === savedCategoryId);

          if (matchedCat) {
            matchedCat.open = true;
            this.selectedCategory = matchedCat.name;
          }
        }
      },
      error: (err) => console.error("Error loading saved specialties", err)
    });
  }
  selectedSpecialties: string[] = [];
  selectedCategory: string | null = null;
  isLoading = false;

  toggleCategory(cat: any) {
    cat.open = !cat.open;
    this.selectedCategory=cat;
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

  next() {

    if (!this.api.userId) {
      console.error("User ID missing");
      return;
    }

    if (!this.selectedCategory) {
      console.error("Category required");
      return;
    }

    this.isLoading = true;

    this.api.updateCategory(
      this.selectedCategory,
      this.selectedSpecialties
    ).subscribe({
      next: () => {
        this.router.navigateByUrl('/signup-bio');
      },
      error: (err) => {
        console.error("Error saving category", err);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}
