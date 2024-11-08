import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ButtonThemeColor } from '@progress/kendo-angular-buttons';
import { NotificationRef, NotificationService } from '@progress/kendo-angular-notification';

import {getDate,addYears} from "@progress/kendo-date-math";
import { EmployeeService } from 'src/app/service/emp/employee.service';
import { Employee } from 'src/models/employee';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {

  loading: boolean = true;
   employee!: Employee;
   editForm!: FormGroup<any>;
  public notificationMsg: string = "";

  @ViewChild('notifTemplate', { read: TemplateRef })
  public notificationTemplate!: TemplateRef<unknown>;
  public notificationRef!: NotificationRef;

  public themeColor: ButtonThemeColor = "primary"
  public min: Date = new Date(1917, 0, 1);
  public max: Date = new Date(2020, 4, 31);
  public maxDob: Date = addYears(getDate(new Date()), -18);
  public designations: string[] = [
    "Associate Engineer",
    "Software Engineer",
    "Senior Software Engineer",
    "Team Lead",
    "Project Manager"
  ];

  public experienceInYears: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  public genderData: { [Key: string]: string } = {
    gender: ""
  };
  public technicalSkillss: Array<string> = [
    "Java",
    "Python",
    "JavaScript",
    "HTML/CSS",
    "React",
    "Node.js",
    "MySQL",
    "AWS",
    "TensorFlow",
    "Scrum"
  ];
  private source: Array<string>; // declare a private variable to store the original array

  states = [
    "Telangana",
    "AndraPradesh",
    "Karnataka",
    "Thamilnadu",
    "Kerala"
  ];
  addressFormGroup!: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router, private service: EmployeeService,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService
  ) {
    this.source = this.technicalSkillss.slice();
  }

  public onFilterChange(searchTerm: string): void {
    const contains =
      (value: string) =>
        value.toLowerCase().includes(searchTerm.toLowerCase());

    this.technicalSkillss = this.source.filter(contains);
  }

  isExperiencedEnabled: Boolean = false;
  onExperienceCheckboxChange(event: any) {
    this.isExperiencedEnabled = event.target.checked ? true : false;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = Number(params.get('id'));
      if (id) {
        this.service.getEmployeeById(id).subscribe(
          (employee: Employee) => {
            this.employee = employee;
            console.log('editEmployee ==> ', this.employee);
            this.editForm = this.formBuilder.group({
              id: [this.employee.id, Validators.required],
              firstName: [this.employee.firstName, Validators.required],
              lastName: [this.employee.lastName, Validators.required],
              gender: [this.employee.gender, Validators.required],
              email: [this.employee.email, [Validators.required, Validators.email]],
              phoneNumber: [this.employee.phoneNumber,[Validators.required, Validators.pattern('^[0-9]{10}$')]],
              dob: [this.employee.dob, Validators.required],
              designation: [this.employee.designation, Validators.required],
              technicalSkills: [this.employee.technicalSkills, Validators.required],
              active: [this.employee.active],
              experienced: [this.employee.experienced],
              experience: [this.employee.experience, Validators.required],
              otherSkills: [this.employee.otherSkills],
              age: [this.employee.age, Validators.required],
              salary: [this.employee.salary, Validators.required],
              address: this.formBuilder.group({
                street: [this.employee.address.street],
                city: [this.employee.address.city],
                state: [this.employee.address.state],
                country: [this.employee.address.country],
                zipCode: [this.employee.address.zipCode,[Validators.required, Validators.pattern('^[0-9]{6}$')]]
              })
            });
            this.loading = false;
          }
        );
      }
    });
  }

  get isFormDirty(): boolean {
    return this.editForm.dirty;
  }

  updateEmployee(): void {
    // Update the employee with the new data from the form
    console.log(this.editForm.value);
    let employee: Employee = this.editForm.value;
    this.service.updateEmployee(employee).subscribe(
      {
        next: () => {
          this.notificationMsg = `Employee ${employee.firstName} was updated successfully !`;
          this.showSuccess(employee.firstName); 
          this.router.navigate(['/employees']); 
        }, 
        error: () => { 
          console.log('Update employee request failed with error');
        }, 
      } );

}

cancelEdit(): void { 
  // Reset the form and cancel the edit 
  this.router.navigate(['/employees']); 
  }

clearEdit():void{ 
  this.editForm.controls['gender'].reset(this.employee.gender); 
  this.editForm.controls['firstName'].reset(this.employee.firstName); 
  this.editForm.controls['lastName'].reset(this.employee.lastName); 
  this.editForm.controls['age'].reset(this.employee.age); 
  this.editForm.controls['salary'].reset(this.employee.salary); 
}

public showSuccess(name:string): void {
   this.notificationService.show({ 
    // appendTo: this.appendTo, 
    // content: Employee ${name} record Successfully Created!, 
    content: this.notificationTemplate, 
    hideAfter: 800, 
    position: { horizontal: "right", vertical: "bottom"}, 
    animation: { type: "fade", duration:600 }, 
    type: { style: "success", icon: true }, 
    //closable:true, width:450,
   });
  }
}

   
