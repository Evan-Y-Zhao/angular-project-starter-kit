import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnauthComponent } from './unauth/unauth.component'
import { AuthGuard } from './auth/auth.guard';
import { SimpleLayoutComponent } from './shared/simple-layout/simple-layout.component';
import { AppLayoutComponent } from './shared/layout/app-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full', },
      {
        path: 'dashboard',
        canActivateChild: [AuthGuard],
        component: DashboardComponent
      },
    ]
  },
  {
    path: '',
    component: SimpleLayoutComponent,
    children: [
      { path: 'unauth', component: UnauthComponent },
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
