import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'start',
        loadChildren: () =>
          import('../home-hub/home-hub.module').then(m => m.HomeHubPageModule),
      },
      {
        path: 'home',
        loadChildren: () =>
          import('../services/services.module').then(m => m.ServicesPageModule),
      },
      {
        path: 'services',
        loadChildren: () =>
          import('../services/services.module').then(m => m.ServicesPageModule),
      },
      {
        path: 'jobs',
        loadChildren: () =>
          import('../jobs/jobs.module').then(m => m.JobsPageModule),
      },
      {
        path: 'products',
        loadChildren: () =>
          import('../products/products.module').then(m => m.ProductsPageModule),
      },
      {
        path: 'messages',
        loadChildren: () =>
          import('../messages/messages.module').then(m => m.MessagesPageModule),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('../profile/profile.module').then(m => m.ProfilePageModule),
      },
      {
        path: '',
        redirectTo: 'services',
        pathMatch: 'full',
}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}