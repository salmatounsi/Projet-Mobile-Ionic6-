import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
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
  {
    path: 'services',
    loadChildren: () => import('./pages/services/services.module').then( m => m.ServicesPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./pages/menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'create-service',
    loadChildren: () => import('./pages/create-service/create-service.module').then( m => m.CreateServicePageModule)
  },

  // Auth/Profile
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfilePageModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule),
  },

  // Products / Store
  {
    path: 'new-product',
    loadChildren: () => import('./pages/new-product/new-product.module').then(m => m.NewProductPageModule),
  },
  {
    path: 'products',
    loadChildren: () => import('./pages/products/products.module').then(m => m.ProductsPageModule),
  },

  // Messaging
  {
    path: 'messages',
    loadChildren: () => import('./pages/messages/messages.module').then(m => m.MessagesPageModule),
  },
  {
    path: 'chat/:id',
    loadChildren: () => import('./pages/chat/chat.module').then(m => m.ChatPageModule),
  },

  // Tabs + role hub + pages principales
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule),
  },
  {
    path: 'home-hub',
    loadChildren: () => import('./pages/home-hub/home-hub.module').then(m => m.HomeHubPageModule),
  },
  {
    path: 'jobs',
    loadChildren: () => import('./pages/jobs/jobs.module').then(m => m.JobsPageModule),
  },
  {
    path: 'services',
    loadChildren: () => import('./pages/services/services.module').then(m => m.ServicesPageModule),
  },

  // Other existing routes from upstream
  {
    path: 'freelancer-services',
    loadChildren: () => import('./pages/frelaancer-services/frelaancer-services.module').then(m => m.FrelaancerServicesPageModule),
  },
  {
    path: 'create-service',
    loadChildren: () => import('./pages/create-service/create-service.module').then(m => m.CreateServicePageModule),
  },
  {
    path: 'signup-client',
    loadChildren: () => import('./pages/signup-client/signup-client.module').then(m => m.SignupClientPageModule),
  },
  {
    path: 'create-job-client',
    loadChildren: () => import('./pages/create-job-client/create-job-client.module').then(m => m.CreateJobClientPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}