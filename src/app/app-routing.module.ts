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
  },  {
    path: 'choose-plan',
    loadChildren: () => import('./pages/choose-plan/choose-plan.module').then( m => m.ChoosePlanPageModule)
  },
  {
    path: 'signup-specialties',
    loadChildren: () => import('./pages/signup-specialties/signup-specialties.module').then( m => m.SignupSpecialtiesPageModule)
  },
  {
    path: 'signup-experience',
    loadChildren: () => import('./pages/signup-experience/signup-experience.module').then( m => m.SignupExperiencePageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
