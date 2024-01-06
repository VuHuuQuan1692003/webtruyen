import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout/default-layout/default-layout.component';
import { ClientLayoutComponent } from './layout/client-layout/client-layout.component';
import { HomeComponent } from './pages/client/home/home.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { WatchComponent } from './pages/client/watch/watch.component';
import { DetailComponent } from './pages/client/detail/detail.component';

const routes: Routes = [
  {
    path: '', component: DefaultLayoutComponent, children: [
      {
        path: "", component: ClientLayoutComponent, children: [
          { path: "", redirectTo: 'home', pathMatch: 'full' },
          { path: "home", component: HomeComponent },
          { path: "detail/:id", component: DetailComponent },
          { path: "watch/:id", component: WatchComponent },


        ]
      },
      {
        path: "admin", component: AdminLayoutComponent, children: [
          { path: "admin", redirectTo: 'dashboard', pathMatch: 'full' },

        ]
      }
    ]
  }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
