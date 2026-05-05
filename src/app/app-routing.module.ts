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
},
{
    path: 'projects',
    loadChildren: () => import('./pages/projects/projects.module').then( m => m.ProjectsPageModule)
 },


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
},
  {
    path: 'projects',
    loadChildren: () => import('./pages/projects/projects.module').then( m => m.ProjectsPageModule)
  },
  {
    path: 'project-detail',
    loadChildren: () => import('./pages/project-detail/project-detail.module').then( m => m.ProjectDetailPageModule)
  },

  {
  path: 'project-detail/:id',
  loadChildren: () => import('./pages/project-detail/project-detail.module').then(m => m.ProjectDetailPageModule)
},
  {
    path: 'create-project',
    loadChildren: () => import('./pages/create-project/create-project.module').then( m => m.CreateProjectPageModule)
  },
{ path: 'admin-dashboard', loadChildren: () => import('./pages/admin/admin-dashboard/admin-dashboard.module').then(m => m.AdminDashboardPageModule) },
{ path: 'admin-freelancers', loadChildren: () => import('./pages/admin/admin-freelancers/admin-freelancers.module').then(m => m.AdminFreelancersPageModule) },
{ path: 'admin-freelancer-detail/:id', loadChildren: () => import('./pages/admin/admin-freelancer-detail/admin-freelancer-detail.module').then(m => m.AdminFreelancerDetailPageModule) },
{ path: 'admin-jobs', loadChildren: () => import('./pages/admin/admin-jobs/admin-jobs.module').then(m => m.AdminJobsPageModule) },
{ path: 'admin-projects', loadChildren: () => import('./pages/admin/admin-projects/admin-projects.module').then(m => m.AdminProjectsPageModule) },  {
    path: 'admin-clients',
    loadChildren: () => import('./pages/admin/admin-clients/admin-clients.module').then( m => m.AdminClientsPageModule)
  },
  {
    path: 'admin-services',
    loadChildren: () => import('./pages/admin/admin-services/admin-services.module').then( m => m.AdminServicesPageModule)
  },
  {
    path: 'admin-products',
    loadChildren: () => import('./pages/admin/admin-products/admin-products.module').then( m => m.AdminProductsPageModule)
  },



  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
