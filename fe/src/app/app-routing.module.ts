import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout/default-layout/default-layout.component';
import { ClientLayoutComponent } from './layout/client-layout/client-layout.component';
import { HomeComponent } from './pages/client/home/home.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { WatchComponent } from './pages/client/watch/watch.component';
import { DetailComponent } from './pages/client/detail/detail.component';
import { ProductsComponent } from './pages/admin/products/products.component';
import { UsersComponent } from './pages/admin/users/users.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: "", component: ClientLayoutComponent, data: { breadcrumb: 'Home' }, children: [
      { path: "", component: HomeComponent },
      { path: "detail", component: DetailComponent, data: { breadcrumb: 'Detail' } },


    ]
  },
  { path: "watch", component: WatchComponent, data: { breadcrumb: 'Watch' } },
  {
    path: "admin", component: AdminLayoutComponent, children: [
      { path: "admin", redirectTo: 'dashboard', pathMatch: 'full' },
      { path: "dashboard", component: DashboardComponent },
      { path: "users", component: UsersComponent },
      { path: "products", component: ProductsComponent },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
