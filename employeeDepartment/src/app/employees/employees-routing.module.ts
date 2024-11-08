import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './employees.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { DepartmentComponent } from '../department/department.component';

const routes: Routes = [
  { path: '', component: EmployeesComponent },
  { path: 'add', component: AddComponent },
  { path: 'edit/:id', component: EditComponent },
  // {path: 'department', component:DepartmentComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
