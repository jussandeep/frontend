import { HttpClient } from '@angular/common/http';
import { Text } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginComponent } from 'src/app/login/login.component';
import { userInfoBackendFields } from 'src/models/forgotpasswordfields';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {
  private baseUrl="http://localhost:8082";

  constructor(
    // private login : LoginComponent
   private http: HttpClient,
  ) { }
 

  // authenticateEmail(fields: any):boolean{
    
  // console.log('before'+this.isUserLoggedIn());
  //   if (fields.email !=''){
  //     sessionStorage.setItem('authenticaterUser', fields.email);
  //     console.log('After'+this.isUserLoggedIn());
  //     return true;
  //   }
  //   return false;
  // }
  // isUserLoggedIn(){
  //   let user = sessionStorage.getItem('authenticaterUser')
  //   return !(user === null)
  // }

authenticate (data: userInfoBackendFields){
return this.http.post(`${this.baseUrl}/authenticate`, data, { responseType: 'text' });
}


postNewUser(data: any){
  return this.http.post(`${this.baseUrl}/new`, data, {responseType: 'text'});
}
}
