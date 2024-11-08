import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentRoutingModule } from './department-routing.module';
import { DepartmentComponent } from './department.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { HttpClientModule } from '@angular/common/http'; 
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';

import { DropDownsModule } from '@progress/kendo-angular-dropdowns';

import { IconsModule } from '@progress/kendo-angular-icons';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmployeesComponent } from '../employees/employees.component';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { AppComponent } from '../app.component';



@NgModule({
  declarations: [
    DepartmentComponent,
    AddComponent,
    EditComponent,
    // EmployeesComponent
    // LoginComponent,
    
  ],
  imports: [
    CommonModule,
    DepartmentRoutingModule,
    GridModule,
    HttpClientModule,
    DialogsModule,
    FormsModule,
    InputsModule,
    LabelModule,
    ReactiveFormsModule,
    DropDownsModule,
    IconsModule,
    ButtonModule,
    NotificationModule,
    //  BrowserAnimationsModule,
    //  BrowserModule,
  ],
  providers: [],
  
})
export class DepartmentModule { }
