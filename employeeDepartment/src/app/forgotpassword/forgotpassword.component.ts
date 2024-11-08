import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { userInfo } from 'src/models/signupUserfields';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { userInfoBackendFields } from 'src/models/forgotpasswordfields';
import { GetuserdataService } from '../service/forGotPassworduserInfget/getuserdata.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit{
  kendoformfrogotpass!: FormGroup;
  
  public userInformations: userInfoBackendFields []=[];
  // idParam:number=0;
  constructor(
    private form: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private http :HttpClient,
    private service :GetuserdataService,
  ){}
  ngOnInit(): void {
    this.kendoformfrogotpass= this.form.group({
      formEmail:['', [Validators.required, Validators.email]],
      formCreatePassword:['', [Validators.required, Validators.minLength(6)]],
      
      formConfirmPassword:['', Validators.required],
    },
    {
      validator: this.MustMatch('formCreatePassword', 'formConfirmPassword') 
    })
    this.loadUserInformation();
  }

  MustMatch(formCreatePassword: string, formConfirmPassword: string){
    return(formgroup: FormGroup)=>{
  const control = formgroup.controls[formCreatePassword];
  const matching = formgroup.controls[formConfirmPassword];
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

  loadUserInformation():void{
    this.service.getAllUserInformation().subscribe((data : userInfoBackendFields[])=>{
     this.userInformations = data;
     console.log("User Information:", data);
    })
  }

updataNewPasswordAndSave(): void{
  if (this.kendoformfrogotpass.invalid) {
    this.kendoformfrogotpass.markAllAsTouched(); // Mark all fields as touched to trigger validation messages
    return; // Exit the method if form is invalid
  }
    const updatePassword: userInfoBackendFields= {
 
      email: this.kendoformfrogotpass.get('formEmail')?.value,
      password: this.kendoformfrogotpass.get('formCreatePassword')?.value,
     
    };


    this.service.updateForgotPassword( updatePassword).subscribe({
next:()=>{

  this.router.navigate(['/login']);
  console.log("navigated")
},
error:(err)=>{
  console.error("error occurred while updating password:", err)
}
    });
  }

  // onLogin():void{
  //   this.router.navigate(['login'], {relativeTo: this.route})
  // }
}
