import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentComponent } from './department.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { HomeComponent } from '../home/home.component';
import { EmployeesComponent } from '../employees/employees.component';
import { LoginComponent } from '../login/login.component';
// import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: DepartmentComponent },
  {path:'add', component:AddComponent},
  {path: 'edit/:id', component:EditComponent},
  {path: 'employees', component:EmployeesComponent},
  
  
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentRoutingModule { }
