import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateFormGroupArgs } from '@progress/kendo-angular-grid';


import { SVGIcon } from '@progress/kendo-angular-icons';
import { plusIcon, saveIcon, trashIcon } from '@progress/kendo-svg-icons';
import { cancelIcon } from '@progress/kendo-svg-icons';
import { DialogCloseResult, DialogRef, DialogService, DialogThemeColor } from '@progress/kendo-angular-dialog';
import { NotificationService } from '@progress/kendo-angular-notification';
import { ActivatedRoute, Route, Router } from '@angular/router';
// import { BadgeSize, BadgeRounded, BadgeFill, BadgeThemeColor } from '@progress/kendo-angular-indicators';
import { EmployeeService } from '../service/emp/employee.service';
import { Employee } from 'src/models/employee';
//import { cancelIcon, saveIcon, SVGIcon } from '@progress/kendo-svg-icons';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent {

  public plusSVG:SVGIcon=plusIcon

  // public size: BadgeSize = "medium";
  // public rounded: BadgeRounded = "medium";
  // public fill: BadgeFill = "solid";
  // public themeColor: BadgeThemeColor = "primary";

  public employees: Employee[] = [];
rounded: any;
  // public formGroup: FormGroup = this.formBuilder.group({
  //   id: null,
  //   firstName: "",
  //   lastName: '',
  //   gender: '',
  //   age: null,
  //   salary: null,
  // });

  constructor(
    private formBuilder: FormBuilder, 
   
    private service: EmployeeService,
    private dialogService: DialogService,
    private router:Router,
    private route:ActivatedRoute,
  private notificationService:NotificationService) {
   //this.createFormGroup = this.createFormGroup.bind(this);
  }

  ngOnInit(){
    this.service.getEmployees().subscribe((data:Employee[])=>{
      this.employees = data;
      console.log(this.employees);
    });
  }

  // public createFormGroup(args: CreateFormGroupArgs): FormGroup {
  //   const item = args.isNew ? new Employee() : args.dataItem;

  //   this.formGroup = this.formBuilder.group({
  //     //id: item.id,
  //     firstName: [item.firstName, Validators.required],
  //     lastName: item.lastName,
  //     // UnitsInStock: [
  //     //   item.UnitsInStock,
  //     //   Validators.compose([
  //     //     Validators.required,
  //     //     Validators.pattern("^[0-9]{1,3}"),
  //     //   ]),
  //     // ],
  //     age: item.age,
  //     gender: item.gender,
  //     salary: item.salary,
  //   });

  //   return this.formGroup;
  // }

 

  public save(formGroup: FormGroup): void {
    if (formGroup.valid) {
      const employee: Employee = formGroup.value;
      if (employee.id) {
        this.service.updateEmployee(employee).subscribe(() => {
          console.log("Employee updated");
        });
      } else {
        this.service.addEmployee(employee).subscribe(() => {
          console.log("Employee added");
        });
      }
    }
  }
  public trashIcon: SVGIcon = trashIcon;
  public result: any;
  public dialogThemeColor:DialogThemeColor="primary"
public opened=false;
  public remove(employee: Employee): void {
    this.opened=true;
    this.showConfirmation(employee);
     
  }

  public showConfirmation(employee:Employee): void {
    const dialogRef: DialogRef = this.dialogService.open({
      title: "Please confirm",

      // Show component
      content:`Are you sure you want to delete ${employee.firstName} record ?` ,

      actions: [{ text: "Cancel" }, { text: "Delete", themeColor: "primary" }],
    });
    console.log(dialogRef.result.subscribe());

    dialogRef.result.subscribe((result) => {
      if (result instanceof DialogCloseResult) {
        console.log('close');
      } else if(result['text']==="Delete") {
        console.log(result);
        this.service.deleteEmployee(employee.id).subscribe();
          console.log("Employee removed");
        this.showSuccess(employee.firstName);
      }
    });
  }

  public showSuccess(name:string): void {
    this.notificationService.show({
      content: `Employee ${name} record Successfully deleted!`,
      hideAfter: 600,
      position: { horizontal: "right", vertical: "bottom" },
      animation: { type: "fade", duration: 400 },
      type: { style: "success", icon: true },
      closable:true
    });
  }

  editEmployee(id:number){
    console.log("edit employee "+id);
    this.router.navigate(['edit/',id],{ relativeTo: this.route });
    
  }

  AddNewEmployee(){
    console.log("Add new employee");
    this.router.navigate(['add'], { relativeTo: this.route });
  }

  Department(){
    this.router.navigate(['/department'], {relativeTo: this.route});
  }
}
