import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {

//   constructor(private httpClient:HttpClient) { }

//   authenticate(username:any,password:any){
//     if(username==='admin' && password==='1234'){
//       sessionStorage.setItem('authenticatedUser',username);
//       return true;
//   }
//   else{
//     return false;
//   }
// }

// executeBasicAuthenticationService(username:any,password:any):Observable<AuthenticationBean>{
//   //let basicAuthHeaderString= this.createBasicAuthenticationHeader();
//   let basicAuthHeaderString= 'Basic '+window.btoa(username+':'+password);
//   let headers=new HttpHeaders({
//     Authorization: basicAuthHeaderString
//   });
 
//   const url="http://localhost:8080/basicauth";
//   console.log(url);

//   return this.httpClient.get<AuthenticationBean>(url,{headers:headers}).pipe(
//     map(
//       data=>{
//         sessionStorage.setItem('authenticatedUser',username);
//         sessionStorage.setItem('token',basicAuthHeaderString);
//         return data;
//       }
//     )
//   );
// }


// executeJwtAuthenticationService(username:any,password:any):Observable<any>{
//   //let basicAuthHeaderString= this.createBasicAuthenticationHeader();
//   let basicAuthHeaderString= 'Basic '+window.btoa(username+':'+password);
//   let headers=new HttpHeaders({
//     Authorization: basicAuthHeaderString
//   });
 
//   const url="http://localhost:8080/authenticate";
//   console.log(url);

//   return this.httpClient.post<any>(url,{username,password}).pipe(
//     map(
//       data=>{
//         sessionStorage.setItem('authenticatedUser',username);
//         sessionStorage.setItem('token',`Bearer ${data.token}`);
//         return data;
//       }
//     )
//   );
// }

// // createBasicAuthenticationHeader(){
// //   let username="admin";
// //   let password = "1234";
// //   let basicAuthHeaderString= 'Basic '+window.btoa(username+':'+password);
// //   return basicAuthHeaderString;
// // }

// getAuthenticatedUser(){
//   return sessionStorage.getItem('authenticatedUser');
// }

// getAuthenticatedToken(){
//   if(this.getAuthenticatedUser())
//     return sessionStorage.getItem('token');
//   else
//     return null;
// }

//   isUserLoggedIn(){
//     let user= sessionStorage.getItem('authenticatedUser');
//     return !(user===null);
//   }

//   logOut(){
//     sessionStorage.removeItem('authenticateUser');
//     sessionStorage.removeItem('token');
//   }

// }
// export class AuthenticationBean{
//   constructor(public message:string){}
}
