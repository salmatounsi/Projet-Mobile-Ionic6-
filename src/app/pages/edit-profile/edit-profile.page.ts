import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from '../../services/profile-service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
  standalone: false,
})
export class EditProfilePage implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private profileService = inject(ProfileService);

  profileForm!: FormGroup;
  role: 'client' | 'freelancer' = 'freelancer';
  loading = false;

  // Photo de profil
  selectedImage: File | null = null;
  imagePreview: string | null = null;

  // CV
  selectedCv: File | null = null;
  cvFileName: string | null = null;

  // Compétences
  skills: string[] = [];
  skillInput = '';

  // Langues
  languages: any[] = [];

  // Formations
  education: any[] = [];

  // Expériences
  experience: any[] = [];

  // Spécialités
  categoryMain = '';
  subCategories: string[] = [];
  subCategoryInput = '';

  ngOnInit() {
    this.profileForm = this.fb.group({
  first_name: [''],
  last_name: [''],
  email: [''],
  country: [''],
  professional_role: [''],
  bio: ['']
});

    this.loadProfile();
  }
loadProfile() {
  this.profileService.fetchProfileData().subscribe({
    next: (res: any) => {
      const profile = res.profile;

      console.log('EDIT PROFILE DATA:', profile);

      this.role = profile?.role || localStorage.getItem('role') || 'freelancer';

      this.profileForm.patchValue({
        first_name: profile?.general_info?.first_name || '',
        last_name: profile?.general_info?.last_name || '',
        email: profile?.email || '',
        country: profile?.general_info?.country || '',
        professional_role: profile?.professional_role || '',
        bio: profile?.bio || ''
      });

      this.imagePreview = profile?.general_info?.profile_image || null;
      this.cvFileName = profile?.cvFile ? 'CV déjà importé' : null;

      this.skills = profile?.skills || [];
      this.languages = profile?.languages || [];
      this.education = profile?.education || [];
      this.experience = profile?.experience || [];

      this.categoryMain = profile?.categories?.main || '';
      this.subCategories = profile?.categories?.sub_categories || [];
    },
    error: (err: any) => {
      console.error('Error loading profile:', err);
      alert('Erreur lors du chargement du profil.');
    }
  });
}

  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    this.selectedImage = input.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };

    reader.readAsDataURL(this.selectedImage);
  }

  onCvSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    this.selectedCv = input.files[0];
    this.cvFileName = this.selectedCv.name;
  }

  addSkill() {
    const skill = this.skillInput.trim();

    if (!skill) {
      return;
    }

    if (!this.skills.includes(skill)) {
      this.skills.push(skill);
    }

    this.skillInput = '';
  }

  removeSkill(skill: string) {
    this.skills = this.skills.filter(s => s !== skill);
  }

  addLanguage() {
    this.languages.push({
      language: '',
      proficiency: ''
    });
  }

  removeLanguage(index: number) {
    this.languages.splice(index, 1);
  }

  addEducation() {
    this.education.push({
      school: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      currently: false,
      description: ''
    });
  }

  removeEducation(index: number) {
    this.education.splice(index, 1);
  }

  addExperience() {
    this.experience.push({
      title: '',
      company: '',
      location: '',
      country: '',
      startDate: '',
      endDate: '',
      currentlyInRole: false
    });
  }

  removeExperience(index: number) {
    this.experience.splice(index, 1);
  }

  addSubCategory() {
    const value = this.subCategoryInput.trim();

    if (!value) {
      return;
    }

    if (!this.subCategories.includes(value)) {
      this.subCategories.push(value);
    }

    this.subCategoryInput = '';
  }

  removeSubCategory(sub: string) {
    this.subCategories = this.subCategories.filter(s => s !== sub);
  }

  saveProfile() {
  this.loading = true;

  const formData = new FormData();

  formData.append('first_name', this.profileForm.value.first_name || '');
  formData.append('last_name', this.profileForm.value.last_name || '');
  formData.append('email', this.profileForm.value.email || '');
  formData.append('country', this.profileForm.value.country || '');

  if (this.selectedImage) {
    formData.append('profile_image', this.selectedImage);
  }

  if (this.role === 'freelancer') {
    formData.append('professional_role', this.profileForm.value.professional_role || '');
    formData.append('bio', this.profileForm.value.bio || '');

    formData.append('skills', JSON.stringify(this.skills));
    formData.append('languages', JSON.stringify(this.languages));
    formData.append('education', JSON.stringify(this.education));
    formData.append('experience', JSON.stringify(this.experience));

    formData.append('categories', JSON.stringify({
      main: this.categoryMain,
      sub_categories: this.subCategories
    }));

    if (this.selectedCv) {
      formData.append('cvFile', this.selectedCv);
    }
  }

  this.profileService.updateProfile(formData).subscribe({
    next: () => {
      this.loading = false;
      alert('Profil modifié avec succès.');
      this.router.navigateByUrl('/tabs/profile');
    },
    error: (err: any) => {
      this.loading = false;
      console.error('Update profile failed:', err);
      alert('Erreur lors de la modification du profil.');
    }
  });
}
}