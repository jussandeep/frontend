import { animation } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { animationDuration } from '@progress/kendo-angular-dropdowns/common/util';
import { NotificationService } from '@progress/kendo-angular-notification';
import { DepartmentServiceService } from 'src/app/service/data/department-service.service';
import { departmentdata } from 'src/models/department';
// import { commonDTO, departmentDto } from 'src/models/department';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  form!: FormGroup;
//   listItems = [
//     { text: 'Sales Manager', value: 'sales_manager' },
//     { text: 'Marketing Specialist', value: 'marketing_specialist' },
//     { text: 'Java Developer', value: 'java_developer' },
//     { text: 'HR Manager', value: 'hr_manager' },
//     { text: 'Accountant', value: 'accountant' },
//     { text: 'Support Specialist', value: 'support_specialist' },
//     { text: 'System Administrator', value: 'system_administrator' },
//     { text: 'Research Scientist', value: 'research_scientist' },
//     { text: 'Operations Manager', value: 'operations_manager' },
//     { text: 'Legal Advisor', value: 'legal_advisor' }
// ];

// listItems = [
//   { text: 'Sales Manager' },
//   { text: 'Marketing Specialist' },
//   { text: 'Java Developer' },
//   { text: 'HR Manager' },
//   { text: 'Accountant' },
//   { text: 'Support Specialist' },
//   { text: 'System Administrator' },
//   { text: 'Research Scientist' },
//   { text: 'Operations Manager' },
//   { text: 'Legal Advisor' }
// ];
listItems = [
  { text: 'Sales Manager', value: 'Sales Manager' },
  { text: 'Marketing Specialist', value: 'Marketing Specialist' },
  { text: 'Java Developer', value: 'Java Developer' },
  { text: 'HR Manager', value: 'HR Manager' },
  { text: 'Accountant', value: 'Accountant' },
  { text: 'Support Specialist', value: 'Support Specialist' },
  { text: 'System Administrator', value: 'System Administrator' },
  { text: 'Research Scientist', value: 'Research Scientist' },
  { text: 'Operations Manager', value: 'Operations Manager' },
  { text: 'Legal Advisor', value: 'Legal Advisor' }
];

  phoneNumbers: string[] = [];
  phoneNumberExists: boolean = false;
errorMessage: String ="";
  // phoneNumberExists :boolean=true;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    
    private departmentService: DepartmentServiceService,
    private notificationServices: NotificationService,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null, [Validators.required, this.letterValidation()]],
      numberOfEmployees: [null, [Validators.required, this.numberOfEmployeesValidator()]],
      RolesandWorkTypes: [null, [Validators.required]], 
      isActive: [false],
      phoneNumber: new FormControl("", {
        validators: [Validators.required, Validators.pattern('^[0-9]{10}$')],
        asyncValidators: [this.checkPhoneNumberExists.bind(this)]
       
      })
    });
   
  this.departmentService.getPhoneNumbers().subscribe(
    (response) => {
      this.phoneNumbers = response;
      console.log("phonenumbers==>", this.phoneNumbers);
      
    }
   );
  
}


  saveData(): void {
    this.errorMessage = '';  // Reset error message

    console.log('Form Status:', this.form.status);
    if (this.form.invalid) {
      console.log('Form is invalid');
      return;
    }

    const selectedRole = this.form.get('RolesandWorkTypes')?.value?.value;

    const newDepartment: departmentdata  = {
      departmentId: 0,
      departmentName: this.form.get('name')?.value,
      numberOfEmployees: this.form.get('numberOfEmployees')?.value, 
      rolesandWorkTypes: selectedRole,
      active: this.form.get('isActive')?.value ?? false,
      phoneNumber: this.form.get('phoneNumber')?.value,
    };
    // const newCommonDTO: departmentdata = new departmentdata();

    this.departmentService.addDepartment(newDepartment).subscribe({
      next: (department) => {
        console.log('New department added:', department);
        this.router.navigate(['/department']).then(success => {
          this.notificationServices.show({
            content:    "Successfully Added Department",
            cssClass: "button-notification",
            animation:{type: "fade", duration: 400},
            position: {horizontal: "center", vertical:"top"},
            type:{style:"success", icon: true},
            closable: false,
          });
          if (success) {
            console.log('Navigation to /department successful');
          } else {
            console.error('Navigation to /department failed');
          }
        }).catch(error => {
          console.error('Navigation error:', error);
        });
      },

     
      error: (err) => {
        // console.error('Error adding department:', err);
        // this.errorMessage = err?.error?.message || 'An error occurred while adding the department';

        this.notificationServices.show({
        content:    this.errorMessage = err.message,
        cssClass: "button-notification",
        animation: {type : "slide", duration: 400},
        position: {horizontal: "center", vertical: "top" },
        type:{ style: "error", icon: true, },
        closable: false,
        });




        // this.errorMessage = err.message;

      //   if (err.status === 500 && err.error && err.error.message) {
      //       //this.errorMessage = ""+err.error.message;
      //       this.errorMessage = `Error 500 (Internal Server Error): ${err.error.message}`;
      //     } else if (err.status === 403) {
      //       this.errorMessage = 'Bad request. Please check your input data.';
      //   } else {
      //       this.errorMessage = 'An unexpected error occurred: ';
      //   }
      }
  
    });
    
  }


  letterValidation():ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (value && !/^[a-zA-Z\s]+$/.test(value)) {
        return { invalidInput: true };
      }
      return null;
    };
  };
 
  numberOfEmployeesValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
    
        // Check if the control is empty and return 'required' error if it is
        if (value == null || value === '') {
          return { required: true };
        }

        // Check if the value is not a number or contains non-numeric characters
    if (isNaN(value) || !/^\d+$/.test(value)) {
      return { invalidNumber: true };
    }
    
        // Check if the value is within the valid range and return 'rangeError' if it is not
        if (value < 1 || value > 100) {
          return { rangeError: true };
        }
    
        // Return null if there are no validation errors
        return null;
      };
  }
  
  checkPhoneNumberExists(control: AbstractControl): Promise<ValidationErrors | null> {
    const phoneNumber = control.value;
    return new Promise((resolve) => {
      // First check if the value is empty
      if (!phoneNumber) {
        resolve({ required: true });
      } else if (this.phoneNumbers.includes(phoneNumber)) {
        // Check if phone number exists
        resolve({ phoneNumberExists: true });
      } else if (phoneNumber.length !== 10) {
        // Check if phone number length is invalid
        resolve({ pattern: true });
      } else {
        // Valid phone number
        resolve(null);
      }
    });
  }
  
  cancelPage(): void {
    this.router.navigate(['/department']); 
  }
}






