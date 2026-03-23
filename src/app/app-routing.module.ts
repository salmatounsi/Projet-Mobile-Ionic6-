import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'signup-skills',
    loadChildren: () => import('./pages/signup-skills/signup-skills.module').then( m => m.SignupSkillsPageModule)
  },
  {
    path: 'signup-languages',
    loadChildren: () => import('./pages/signup-languages/signup-languages.module').then( m => m.SignupLanguagesPageModule)
  },
  {
    path: 'choose-plan',
    loadChildren: () => import('./pages/choose-plan/choose-plan.module').then( m => m.ChoosePlanPageModule)
  },
  {
    path: 'signup-specialties/:id',
    loadChildren: () => import('./pages/signup-specialties/signup-specialties.module').then( m => m.SignupSpecialtiesPageModule)
  },
  {
    path: 'signup-experience/:id',
    loadChildren: () => import('./pages/signup-experience/signup-experience.module').then( m => m.SignupExperiencePageModule)
  },
  {
    path: 'signup-education/:id',
    loadChildren: () => import('./pages/signup-education/signup-education.module').then( m => m.SignupEducationPageModule)
  },
  {
    path: 'what-dyd',
    loadChildren: () => import('./pages/what-dyd/what-dyd.module').then( m => m.WhatDydPageModule)
  },
  {
    path: 'general-info',
    loadChildren: () => import('./pages/general-info/general-info.module').then( m => m.GeneralInfoPageModule)
  },
  {
    path: 'bio-cv',
    loadChildren: () => import('./pages/bio-cv/bio-cv.module').then( m => m.BioCvPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
