import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentComponent } from './department/department.component';
import { LoginComponent } from './login/login.component';
import { EmployeesComponent } from './employees/employees.component';
import { AddComponent } from './department/add/add.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
// import { AuthService } from './service/hardCodedAuth/AuthService';
import { AuthGuard } from './service/hardCodedAuth/AuthGuard';
// import { routeGuardGuard } from './route-guard.guard';

const routes: Routes = [
  // {path: '', component: SignupComponent},

  // { path: '', redirectTo: 'signup', pathMatch: 'full' }, // Redirect to signup first
  // {path:'signup', component:SignupComponent },
  // { path: '', redirectTo: 'login', pathMatch: 'full' },
  // { path: 'login', component: LoginComponent },
  
  // // { path: 'department', component: DepartmentComponent },
  // // {path:'signup', loadChildren: () => import('./signup/signup.module').then(m =>m.signup) },
  // {path: 'forgotpassword', component: ForgotpasswordComponent},
  // { path: 'department', loadChildren: () => import('./department/department.module').then(m => m.DepartmentModule), canActivate: [AuthService] }, 
  // //  {path: 'employees', component:EmployeesComponent},
  // { path: 'employees', loadChildren: () => import('./employees/employees.module').then(m => m.EmployeesModule) }, // Lazy load department module
  
  // { path: '**', redirectTo: 'login', pathMatch: 'full' } // Wildcard route to handle any undefined routes

  { path: '', redirectTo: 'signup', pathMatch: 'full' }, // Redirect to signup first
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgotpassword', component: ForgotpasswordComponent },
  { path: 'department', loadChildren: () => import('./department/department.module').then(m => m.DepartmentModule), canActivate: [AuthGuard] },
  { path: 'employees', loadChildren: () => import('./employees/employees.module').then(m => m.EmployeesModule), canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login', pathMatch: 'full' } 


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
