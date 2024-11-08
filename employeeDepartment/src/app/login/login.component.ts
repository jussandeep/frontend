import { Component, ViewChild  } from '@angular/core';
import { AppComponent } from '../app.component';
import { ActivatedRoute, Router } from '@angular/router';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TextBoxComponent } from '@progress/kendo-angular-inputs';
import { eyeIcon, SVGIcon } from '@progress/kendo-svg-icons';

import { AuthService } from '../service/hardCodedAuth/AuthService';
import { AuthenticationServiceService } from '../service/hardCodedAuth/AuthenticationServiceService';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  
  KendoForm! : FormGroup;

  loginObj: any ={
    email: "sandeep@gmail.com",
    password: "sandy@123"
  };

  @ViewChild("password") public textbox!: TextBoxComponent;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    
    private Authservice: AuthenticationServiceService,
    private autherService: AuthService
    // private route:ActivatedRoute,
    // private appComponent:AppComponent,
    // private hardcodedAuthenticationService: HardcodedAuthenticationService,
    // private basicAuthenticationService:BasicAuthenticationService

  ) {}
  

  public eyeIcon: SVGIcon = eyeIcon;
  public ngAfterViewInit(): void {
    this.textbox.input.nativeElement.type = "password";
  }

  public toggleVisibility(): void {
    const inputEl = this.textbox.input.nativeElement;
    if (inputEl.type === "password") {
      inputEl.type = "text";
    } else {
      inputEl.type = "password";
    }
  }

  

  ngOnInit(): void {
    
    this.KendoForm = this.formBuilder.group({
      Email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  // onLogin(): void {
  //   const email = this.KendoForm.value.Email;
  //   const password = this.KendoForm.value.password;

  //   // Use the hardcoded authentication service
  //   if (this.hardcodedAuth.authenticate(email, password)) {
  //     alert('Login successful!');
  //     this.router.navigateByUrl('/department'); // Redirect to the department page
  //   } else {
  //     alert('Invalid email or password.');
  //   }
  // }
onlogintoken(): void{
  if (this.KendoForm.invalid) {
    this.KendoForm.markAllAsTouched(); // Mark all fields as touched to trigger validation messages
    return; // Exit the method if form is invalid
  }
  const fields ={
    email: this.KendoForm.value.Email,
    password: this.KendoForm.value.password,
  };
  




  this.Authservice.authenticate(fields).subscribe({
    next: (token: string) => {
            console.log('Raw response:', token);
            if (token) {
              // Save the token to local storage
              localStorage.setItem('token', token);
             
              // Store the email in sessionStorage after successful login
             
              sessionStorage.setItem('authenticaterUsers', fields.email);
              console.log("login component ",sessionStorage)
             
              alert("Login success");
              
              this.router.navigate(['/department']);
              console.log("navigated")
            } else {
              alert('Login failed: No token received');
            }
          },
          error: (error) => {
            console.error('Error during login:', error);
            alert("invalid credentials")
            // alert(`An error occurred during login: ${error.message}`);
          },
          complete: () => {
            console.log('Login request completed');
          }
  });
}

onSingupPage(){
  this.router.navigate(['/signup'], {relativeTo: this.route});
  console.log("navigated successfully to signup page")
}



}