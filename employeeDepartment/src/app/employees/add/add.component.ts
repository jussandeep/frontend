import { Component, Injectable, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonThemeColor } from '@progress/kendo-angular-buttons';
import { NotificationRef, NotificationService } from '@progress/kendo-angular-notification';


import {getDate,addYears} from "@progress/kendo-date-math";
// import { FileRestrictions } from '@progress/kendo-angular-upload';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpProgressEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable, of, delay, concat } from 'rxjs';
import { Employee } from 'src/models/employee';
import { EmployeeService } from 'src/app/service/emp/employee.service';


 
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {
  [x: string]: any;
  errorMessage: string="";
  public themeColor:ButtonThemeColor="primary"
  public employee!:Employee;
  public notificationMsg:string="";
  

  public min: Date = new Date(1917, 0, 1);
  public max: Date = new Date(2020, 4, 31);
   public maxDob: Date = addYears(getDate(new Date()), -18);
   public designations:string[]=[
    "Associate Engineer",
    "Software Engineer","Senior Software Engineer" , "Team Lead","Project Manager"
   ];

  public experienceInYears:number[]=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
   
  public genderData:{ [Key: string]: string }={
    gender:""
  };
  public technicalSkillss:Array<string>=[
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
   ]
   private source:Array<string>; // declare a private variable to store the original array

   states = [
   "Telangana","AndraPradesh","Karnataka","Thamilnadu","Kerala"
  ];

   constructor(private router:Router, 
       private services: EmployeeService,
       private notificationService:NotificationService,
       
   ){
       this.source = this.technicalSkillss.slice(); // initialize source with a copy of technicalSkillss
   }
   
   public onFilterChange(searchTerm: string): void {
       const contains =
         (value: string) =>
          value.toLowerCase().includes(searchTerm.toLowerCase());
   
       this.technicalSkillss = this.source.filter(contains);
   }

   isExperiencedEnabled:Boolean=false;
  public registerForm!: FormGroup;
  public addressFormGroup!: FormGroup;
  onExperienceCheckboxChange(event: any) {
    this.isExperiencedEnabled = event.target.checked? true: false;
  }


 

  ngOnInit(): void {


    this.addressFormGroup = new FormGroup({
      street: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      country:new FormControl(''),
      zipCode: new FormControl('',[Validators.required, Validators.pattern('^[0-9]{6}$')])
    });

    this.registerForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      gender: new FormControl(this.genderData['gender'], [Validators.required]),
      email: new FormControl("", Validators.email),
      phoneNumber: new FormControl("",[Validators.required, Validators.pattern('^[0-9]{10}$')]),
      dob:new FormControl("",Validators.required),
      designation:new FormControl(null,Validators.required),
      technicalSkills:new FormControl(null,Validators.required),
       isActive: new FormControl(),
       isExperienced: new FormControl(false),
       experience:new FormControl(null,Validators.required),
       otherSkills:new FormControl(""),
      age:new FormControl('',[Validators.required]),
      salary: new FormControl(0),
      address:this.addressFormGroup,
    
    });
  }

  public submitForm(): void {
    this.registerForm.markAllAsTouched();
    if (this.registerForm.valid) {
      console.log("registerForm values==> ",this.registerForm.value);
      this.employee = this.registerForm.value;
      this.services.addEmployee(this.employee).subscribe(
        {
          next: () =>{
            this.notificationMsg=`Employee ${this.employee.firstName} record Successfully Created!`;
            this.showSuccess(this.employee.firstName);
            this.router.navigate(['/employees']);
          },
          error: (err)=>{
            console.log('Add employee request failed with error');
            this.errorMessage = err.message;
          }
        }
      );
     

      
    }

  }
  public showSuccess(name:string): void {
    this.notificationService.show({
      // appendTo: this.appendTo,
      // content: `Employee ${name} record Successfully Created!`,
      content: this.notificationTemplate,
      hideAfter: 800,
      position: { horizontal: "right", vertical: "bottom"},
      animation: { type: "fade", duration:600 },
      type: { style: "success", icon: true },
      //closable:true,
      width:450,
     
     
    });
  }

  public clearForm(): void {
    this.registerForm.reset();
  }

  public cancelForm(): void {
    this.router.navigate(['/employees']);
  }

  @ViewChild('notifTemplate', { read: TemplateRef })
  public notificationTemplate!: TemplateRef<unknown>;
  public notificationRef!: NotificationRef;

}
