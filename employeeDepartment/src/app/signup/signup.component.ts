import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TextBoxComponent } from '@progress/kendo-angular-inputs';
import { eyeIcon, SVGIcon } from '@progress/kendo-svg-icons';

import { userInfo } from 'src/models/signupUserfields';

import { GetuserdataService } from '../service/forGotPassworduserInfget/getuserdata.service';
import { AuthenticationServiceService } from '../service/hardCodedAuth/AuthenticationServiceService';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, AfterViewInit {
  @ViewChild('CreatePassword') public createPasswordTextBox!: TextBoxComponent;
  @ViewChild('ConfirmPassword') public confirmPasswordTextBox!: TextBoxComponent;


public userInformation: userInfo[] =[];


// names: string [] = [];
EmailExists: boolean = false;


  signupForm!: FormGroup;
  public eyeIcon: SVGIcon = eyeIcon;
 
  // signupObj: any={
  //   name: "sandeep",
  //   email: "sandeep@example.com",
  //   password: "9866",
  // roles: "ROLE_ADMINs"

  // }
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private service: GetuserdataService,
    private AuthService: AuthenticationServiceService,
    // private fromgroup: FormGroup
  ) { }
  ngAfterViewInit(): void {
    if (this.createPasswordTextBox && this.confirmPasswordTextBox) {
      this.createPasswordTextBox.input.nativeElement.type = 'password';
      this.confirmPasswordTextBox.input.nativeElement.type = 'password';
    }
  }

  toggleVisibility(): void {
    const inputEl = this.createPasswordTextBox.input.nativeElement;
    inputEl.type = inputEl.type === 'password' ? 'text' : 'password';
  }

  toggleVisibilityforConPass(): void {
    const inputEl = this.confirmPasswordTextBox.input.nativeElement;
    inputEl.type = inputEl.type === 'password' ? 'text' : 'password';
  }

  ngOnInit(): void {
    // this.loadUserInformantion(); 
    this.signupForm = this.formBuilder.group({
      formName: ['', Validators.required],
  //     formName: new FormControl("",{
  // validators:[Validators.required],
  // asyncValidators:[this.CheckName.bind(this)]
  // }),
      formEmail: new FormControl("",{
        validators:[Validators.required, Validators.email],
        // Emailvalidators:[Validators.email],
      asyncValidators: [this.CheckEmail.bind(this)],
    }),
      formCreatePassword: ['', [Validators.required, Validators.minLength(6)]],

      ConfirmPassword: ['', Validators.required ]

   
    
  },
{
  validator: this.MustMatch('formCreatePassword', 'ConfirmPassword') 
});
   
    // this.loadUserInformantion();
    localStorage.removeItem('token');
 
};


MustMatch(formCreatePassword: string, ConfirmPassword: string){
  return(formgroup: FormGroup)=>{
const control = formgroup.controls[formCreatePassword];
const matching = formgroup.controls[ConfirmPassword];
 if(matching.errors && !matching.errors['MustMatch']) {
  return
 }
 if(control.value!== matching.value){
  matching.setErrors({MustMatch:true});
 }else{
  matching.setErrors(null);
 }
}
}
  
  
 
 
  onSignup(): void {
    //======================================
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched(); // Mark all fields as touched to trigger validation messages
      return; // Exit the method if form is invalid
    }
    //===========================================
   
    const signupDataObj = {
        name: this.signupForm.value.formName,
        email: this.signupForm.value.formEmail,
        password: this.signupForm.value.formCreatePassword,
        roles: "ROLE_ADMIN"
      };

      this.AuthService.postNewUser(signupDataObj).subscribe({
        next: () => {
                this.router.navigate(['login']);
              },
              error: (err) => {
                console.error('Signup failed', err);
              }
            });
      
 }




  // onSignup(): void {
  //   if (this.signupForm.invalid) {
  //     this.signupForm.markAllAsTouched(); 
  //     return; 
  //   }
  //   if (this.signupForm.hasError('passwordMismatch')) {
  //     console.log('Passwords do not match');
  //     return; 
  //   }
  //   const signupDataObj = {
  //     name: this.signupForm.value.formName,
  //     email: this.signupForm.value.formEmail,
  //     password: this.signupForm.value.formCreatePassword,
  //     roles: "ROLE_ADMIN"
  //   };
  //   this.http.post('http://localhost:8082/new', signupDataObj, { responseType: 'text' }).subscribe({
  //     next: () => {
  //       this.router.navigate(['login']);
  //     },
  //     error: (err) => {
  //       console.error('Signup failed', err);
  //     }
  //   });
  // }
  
  
  
  loadUserInformantion(): void{
    this.service.getAllUserInformation().subscribe((data: userInfo[])=>{
    this.userInformation= data;

    console.log("User Information", data);

});
  }


  CheckEmail(control: AbstractControl): Promise<ValidationErrors | null>{
    const email = control.value;
    return new Promise((resolve)=>{

      if (!email){
        resolve({required: true});
      } else {
        const EmailExists = this.userInformation.filter(user => user.email === email).length > 0;
        if (EmailExists) {
          resolve({ EmailExists: true });
        } else {
          resolve(null);
        }
      }
    });
  }




  onlogin(){
    this.router.navigate(['login'], {relativeTo: this.route});
  }
 
}


