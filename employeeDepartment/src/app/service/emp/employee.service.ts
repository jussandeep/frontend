import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from 'src/models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  public apiUrl="http://localhost:8080/employeeDetails";
  constructor(private httpClient:HttpClient) { }

  getEmployees():Observable<Employee[]>{
    // let basicAuthHeaderString= this.createBasicAuthenticationHeader();
    // let headers=new HttpHeaders({
    //   Authorization: basicAuthHeaderString
    // });
   
    const url=`${this.apiUrl}/fetch`;
    console.log(url);

    return this.httpClient.get<Employee[]>(url,{
      //headers:headers
    });
  }

  getEmployeeById(id:number):Observable<Employee>{
    const url=`${this.apiUrl}/getEmployeeById/${id}`;
    console.log(url);
    return this.httpClient.get<Employee>(url);
  }

  addEmployee(employee: Employee): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/save`, employee);
  }

  updateEmployee(employee: Employee): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}/updateEmployee`, employee);
  }

  deleteEmployee(id: number):Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/deleteEmployee/${id}`);
  }

  // createBasicAuthenticationHeader(){
  //   let username="admin";
  //   let password = "1234";
  //   let basicAuthHeaderString= 'Basic '+window.btoa(username+':'+password);
  //   return basicAuthHeaderString;
  // }
  
}
