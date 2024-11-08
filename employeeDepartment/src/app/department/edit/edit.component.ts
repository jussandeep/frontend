import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '@progress/kendo-angular-notification';
import { DepartmentServiceService } from 'src/app/service/data/department-service.service';
import { departmentdata } from 'src/models/department';
// import { commonDTO, departmentDto  } from 'src/models/department';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  form: FormGroup;
  department!: departmentdata ;
  errorMessage:string='';

  phoneNumbers: string[] = [];
  phoneNumberExists: boolean = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private service: DepartmentServiceService,
    private notificationServices: NotificationService,
 
  ) {
    this.form = this.fb.group({
      departmentName: ['', Validators.required],
      numberOfEmployees: [null, [Validators.required, this.numberOfEmployeesValidator() ]],
      rolesandWorkTypes:[null, Validators.required],
      active: [null, [Validators.required]],
      phoneNumber:[null, [Validators.required]],
    
    });
  }
  
  // ngOnInit(): void {
  //   const idParam = this.route.snapshot.paramMap.get('id');
  //   const id = idParam ? Number(idParam) : 0;

  //   this.service.getDepartmentDataById(id).subscribe({
  //     next: (data: departmentdata) => {
  //       this.department = data;
  //       console.log(this.department)
  //       this.form = this.fb.group({
  //         departmentName: [ this.department.departmentName, Validators.required],
  //         numberOfEmployees: [this.department.numberOfEmployees, [Validators.required, Validators.min(1)]],
  //         // rolesandWorkTypes:[this.department.rolesandWorkTypes, Validators.required],
  //        rolesandWorkTypes: this.department.rolesandWorkTypes || '',
  //         active: [this.department.active, [Validators.required]],
        
  //       });
  //     },
  idParam:number=0
  ngOnInit(): void {
    const idParamString = this.route.snapshot.paramMap.get('id'); // Retrieve the 'id' from the route.
    this.idParam = idParamString ? Number(idParamString) : 0; // Convert to a number, default to 0 if idParamString is null.
    
    // this.idParam as needed
    console.log('Department ID:', this.idParam);
  
    this.service.getDepartmentDataById( this.idParam).subscribe({
      next: (data: departmentdata ) => {
        this.department = data;
        console.log('department : ', this.department);

        // const selectedRole = this.listItems.find(item => item.value === this.department.rolesandWorkTypes)||null;
        const selectedRole = this.listItems.find(item => item.value === this.department.rolesandWorkTypes) || null;

        this.form = this.fb.group({
          // departmentName: [this.department.departmentName, Validators.required, this. letterValidation() ],
          departmentName: [this.department.departmentName || '', [Validators.required, this.letterValidation()]],
          numberOfEmployees: [this.department.numberOfEmployees || '', [ Validators.required, this.numberOfEmployeesValidator()]],
         
         // rolesandWorkTypes: [selectedRole , Validators.required],
            rolesandWorkTypes: [ selectedRole, Validators.required],
          active: [this.department.active, Validators.required],
         
          // phoneNumber: new FormControl(this.department.phoneNumber || '', {
          //   validators: [Validators.required, Validators.pattern('^[0-9]{10}$')],
          //   asyncValidators: [this.checkPhoneNumberExists.bind(this)]
            
         phoneNumber: new FormControl(this.department.phoneNumber || '', {
              validators: [Validators.required, Validators.pattern('^[0-9]{10}$')],
              asyncValidators: [this.checkPhoneNumberExists.bind(this)]
             
          })


        });
      },
      error: (err) => {
        console.error('Error fetching department data:', err);
      }
    });
    console.log('Update button clicked'); 

    this.service.getPhoneNumbers().subscribe(
      (response) => {
        this.phoneNumbers = response;
        console.log("phonenumbers==>", this.phoneNumbers);
        
      }
     );

  }
 
  


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


  saveEditData(): void {
    // if (this.form.invalid) {
    //   console.log('Form is invalid', this.form.value);
    //   return;
    // }
    // if (!this.department || !this.department.departmentId) {
    //   console.error('Department ID is not available.');
    //   return;

    // }
    console.log('id',this.department.departmentId)
    const updatedDepartment: departmentdata  = {
      departmentId:  this.idParam,
      departmentName: this.form.get('departmentName')?.value,
      numberOfEmployees: this.form.get('numberOfEmployees')?.value,
      rolesandWorkTypes: this.form.get('rolesandWorkTypes')?.value?.value,
      active: this.form.get('active')?.value,
      phoneNumber: this.form.get('phoneNumber')?.value,
    };
    console.log('Updating Department:', updatedDepartment);
  
    this.service.updateDepartmentData( this.idParam, updatedDepartment).subscribe({
      next: (department) => {
        console.log('Department updated:', department);
        this.router.navigate(['/department']); //  route path 
        this.notificationServices.show({
          content:    "Successfully Updated",
          cssClass: "button-notification",
          animation:{type: "fade", duration: 400},
          position: {horizontal: "center", vertical:"top"},
          type:{style:"success", icon: true},
          closable: false,
        });
      },
      error: (err) => {
        // console.error('Error updating department:', err);
        // this.errorMessage = err.message;
       this.notificationServices.show({
        content:  this.errorMessage = err.message,
        cssClass: "button-notification",
        animation:{type: "slide", duration: 400},
        position: {horizontal: "center", vertical:"top"},
        type:{style:"error", icon: true},
        closable: false,
       });
       
        // console.log('Error updating department:', err);  // Log the entire error
    
    // Set the error message from the backend if available
    // this.errorMessage = err.error?.message || 'An unexpected error occurred while updating the department.';
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
  
  // numberOfEmployeesValidator(): ValidatorFn {
  //   return (control: AbstractControl): ValidationErrors | null => {
  //     const value = control.value;
  //     if (value !== null && (value < 1 || value > 100)) {
  //       return { rangeError: true };
  //     }
  //     return null;
  //   };
  // }
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

  cancelEditPage(): void {
    console.log('Form is invalid');
    this.router.navigate(['/department']);
   
  }

}