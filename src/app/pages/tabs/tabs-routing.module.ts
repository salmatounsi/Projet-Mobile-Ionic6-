import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      // ✅ Start = redirection selon rôle (freelancer->jobs, client->services)
      {
        path: 'start',
        loadChildren: () =>
          import('../home-hub/home-hub.module').then((m) => m.HomeHubPageModule),
      },

      // ✅ Maison = Services (donc plus de page blanche)
      {
        path: 'home',
        loadChildren: () =>
          import('../services/services.module').then((m) => m.ServicesPageModule),
      },

      // ✅ Services (si tu veux garder aussi /tabs/services)
      {
        path: 'services',
        loadChildren: () =>
          import('../services/services.module').then((m) => m.ServicesPageModule),
      },

      // ✅ Jobs
      {
        path: 'jobs',
        loadChildren: () =>
          import('../jobs/jobs.module').then((m) => m.JobsPageModule),
      },

      // ✅ Products / Messages / Profile
      {
        path: 'products',
        loadChildren: () =>
          import('../products/products.module').then((m) => m.ProductsPageModule),
      },
      {
        path: 'messages',
        loadChildren: () =>
          import('../messages/messages.module').then((m) => m.MessagesPageModule),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('../profile/profile.module').then((m) => m.ProfilePageModule),
      },

      // ✅ Default tabs route
      { path: '', redirectTo: '/tabs/start', pathMatch: 'full' },
    ],
  },

  // ✅ fallback global
  { path: '', redirectTo: '/tabs/start', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}