import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
  },

  // Signup flow
  {
    path: 'signup-skills',
    loadChildren: () => import('./pages/signup-skills/signup-skills.module').then(m => m.SignupSkillsPageModule),
  },
  {
    path: 'signup-languages',
    loadChildren: () => import('./pages/signup-languages/signup-languages.module').then(m => m.SignupLanguagesPageModule),
  },
  {
    path: 'choose-plan',
    loadChildren: () => import('./pages/choose-plan/choose-plan.module').then(m => m.ChoosePlanPageModule),
  },
  {
    path: 'signup-specialties',
    loadChildren: () => import('./pages/signup-specialties/signup-specialties.module').then(m => m.SignupSpecialtiesPageModule),
  },
  {
    path: 'signup-experience',
    loadChildren: () => import('./pages/signup-experience/signup-experience.module').then(m => m.SignupExperiencePageModule),
  },
  {
    path: 'signup-education',
    loadChildren: () => import('./pages/signup-education/signup-education.module').then(m => m.SignupEducationPageModule),
  },
  {
    path: 'what-dyd',
    loadChildren: () => import('./pages/what-dyd/what-dyd.module').then(m => m.WhatDydPageModule),
  },
  {
    path: 'general-info',
    loadChildren: () => import('./pages/general-info/general-info.module').then(m => m.GeneralInfoPageModule),
  },
  {
    path: 'bio-cv',
    loadChildren: () => import('./pages/bio-cv/bio-cv.module').then(m => m.BioCvPageModule),
  },

  // Auth
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule),
  },
  {
    path: 'signup-client',
    loadChildren: () => import('./pages/signup-client/signup-client.module').then(m => m.SignupClientPageModule),
  },

  // Products
  {
    path: 'new-product',
    loadChildren: () => import('./pages/new-product/new-product.module').then(m => m.NewProductPageModule),
  },

  // Services
  {
    path: 'create-service',
    loadChildren: () => import('./pages/create-service/create-service.module').then(m => m.CreateServicePageModule),
  },
  {
    path: 'freelancer-services',
    loadChildren: () => import('./pages/frelaancer-services/frelaancer-services.module').then(m => m.FrelaancerServicesPageModule),
  },

  // Jobs
  {
    path: 'create-job-client',
    loadChildren: () => import('./pages/create-job-client/create-job-client.module').then(m => m.CreateJobClientPageModule),
  },

  // Chat (hors tabs car route dynamique)
  {
    path: 'chat/:id',
    loadChildren: () => import('./pages/chat/chat.module').then(m => m.ChatPageModule),
  },

  // Menu
  {
    path: 'menu',
    loadChildren: () => import('./pages/menu/menu.module').then(m => m.MenuPageModule),
  },

  // Hub
  {
    path: 'home-hub',
    loadChildren: () => import('./pages/home-hub/home-hub.module').then(m => m.HomeHubPageModule),
  },

  // Tabs (contient home, jobs, products, messages, profile, services)
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule),
  },
 
  {
  path: 'edit-profile',
  loadChildren: () =>
    import('./pages/edit-profile/edit-profile.module').then(m => m.EditProfilePageModule)
},
  {
    path: 'edit-profile',
    loadChildren: () => import('./pages/edit-profile/edit-profile.module').then( m => m.EditProfilePageModule)
  },
  {
    path: 'apply-job',
    loadChildren: () => import('./pages/apply-job/apply-job.module').then( m => m.ApplyJobPageModule)
  },
  
{
  path: 'apply-job/:jobId',
  loadChildren: () =>
    import('./pages/apply-job/apply-job.module').then(m => m.ApplyJobPageModule)
},
{
    path: 'job-applications',
    loadChildren: () => import('./pages/job-applications/job-applications.module').then( m => m.JobApplicationsPageModule)
},

{
  path: 'job-applications/:jobId',
  loadChildren: () =>
    import('./pages/job-applications/job-applications.module').then(m => m.JobApplicationsPageModule)
}

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}