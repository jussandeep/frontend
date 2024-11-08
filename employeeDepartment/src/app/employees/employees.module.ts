import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GridModule } from '@progress/kendo-angular-grid';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { NotificationModule } from '@progress/kendo-angular-notification'; // Ensure this is correct
import { EmployeesRoutingModule } from './employees-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { EmployeesComponent } from './employees.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { DepartmentComponent } from '../department/department.component';

@NgModule({
  declarations: [
    EmployeesComponent,
    AddComponent,
    EditComponent,
    // DepartmentComponent
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    GridModule,
    HttpClientModule,
    DialogsModule,
    FormsModule,
    ReactiveFormsModule,
    NotificationModule,
    InputsModule,
    LabelModule,
    DateInputsModule,
    DropDownsModule,
    
    // UploadsModule, // Uncomment if needed
    // IndicatorsModule // Uncomment if needed
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EmployeesModule { }
