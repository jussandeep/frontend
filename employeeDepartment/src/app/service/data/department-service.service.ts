import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
// import { commonDTO, departmentDto } from 'src/models/department';
import { departmentdata } from 'src/models/department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentServiceService {
 
  private baseUrl = 'http://localhost:8082/departmentDetails';
  public selectedIds: number[] = [];
  constructor(private http: HttpClient) {}
  // private getToken(): string {
  //   return localStorage.getItem('token') || ''; // Retrieve the token from localStorage
  // }
  
  getDepartmentData(): Observable<departmentdata[]> {
    return this.http.get<departmentdata[]>(`${this.baseUrl}/depAllData`)
  }

  // getDepartmentData(): Observable<departmentdata[]> {
  //   const token = localStorage.getItem('token'); // Retrieve the token from localStorage
  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${token}` // Use the retrieved token
  //   });
  //   return this.http.get<departmentdata[]>(`${this.baseUrl}/depAllData`, { headers });// { headers }
    
  // }
  
  getPhoneNumbers():Observable<string[]>{
    // const token = localStorage.getItem('token'); // Retrieve the token from localStorage
    // const headers = new HttpHeaders({
    //   'Authorization': `Bearer ${token}` // Use the retrieved token
    // });
    return this.http.get<string[]>(`${this.baseUrl}/getPhoneNumbers`, ); //{ headers }
    // const url=`${this.baseUrl}/getPhoneNumbers`;
    // return this.http.get<string[]>(url);
  }
  addDepartment(department: departmentdata ): Observable<departmentdata > {
    // const token = localStorage.getItem('token');
    return this.http.post<departmentdata>(`${this.baseUrl}/postData`, department,{
      // headers: new HttpHeaders({
      //   'Content-Type': 'application/json',
      //   'Authorization': `Bearer ${token}` 
      // })
    })
    // .pipe(
    //   catchError(this.handleError)
    // );
  }
   
  // updateDepartmentData(id: number, data: departmentdata ): Observable<any> { 
  //   console.log(data);
  //   console.log(`${this.baseUrl}/depupData/${id}`);
  //   const token = localStorage.getItem('token');
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${token}`
  //   });
  //   return this.http.put(`${this.baseUrl}/depupData/${id}`, data).pipe(
  //     catchError(this.handleError)
  //   );
  // }

    updateDepartmentData(id: number, data: departmentdata): Observable<departmentdata> {
    console.log('Data to be updated:', data);
    console.log('Update URL:', `${this.baseUrl}/depupDate/${id}`);

    // const token = localStorage.getItem('token');
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'Authorization': `Bearer ${token}`
    // });

    return this.http.put<departmentdata>(`${this.baseUrl}/depupDate/${id}`, data,) //{ headers }
      // // .pipe(
      //   catchError(this.handleError)
      // );
  }

  // private handleError(error: any): Observable<never> {
  //   console.error('An error occurred:', error);
  //   return throwError(() => new Error(error.message || 'Server error'));
  // }
  
// edit button code
getDepartmentDataById(id: number): Observable<departmentdata> {
  // const token = localStorage.getItem('token');
  // if (!token) {
  //   return throwError(() => new Error('Token is missing'));
  // }

  // const headers = new HttpHeaders({
  //   'Content-Type': 'application/json',
  //   'Authorization': `Bearer ${token}`
  // });

  console.log(`${this.baseUrl}/depDataFindById/${id}`);
  
  return this.http.get<departmentdata>(`${this.baseUrl}/depDataFindById/${id}`, )//{ headers }
  // .pipe(
  //   catchError(this.handleError)
  // );
}

 

  deleteDepartmentData(id: number): Observable<any> {
    // const token = localStorage.getItem('token');
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'Authorization': `Bearer ${token}`
    // });
  return this.http.delete<any>(`${this.baseUrl}/deleteDepartmentData/${id}`, );//{headers}
  }


  // private handleError(error: HttpErrorResponse): Observable<never> {
  //   let errorMessage = 'An unknown error occurred!';
  //   if (error.error instanceof ErrorEvent) {
  //     // Client-side or network error
  //     errorMessage = `Error: ${error.error.message}`;
  //   } else {
  //     // Backend returned an unsuccessful response code
  //     errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  //   }
  //   console.error(errorMessage);
  //   return throwError(() => new Error(errorMessage));
  // }
  


  // getPhoneNumbers():Observable<string[]>{
  //   const url=`${this.baseUrl}/getPhoneNumbers`;
  //   return this.http.get<string[]>(url);
  // }
  validatePhoneNumber(phoneNumber: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/validatePhoneNumber/${phoneNumber}`)
    // .pipe(
    //   catchError(this.handleError)
    // );
  }
 
deleteSelectedRows(selectedIds: number[]): Observable<any> {
  return this.http.delete<any>(`${this.baseUrl}/deleteSelectedIds`, { body: selectedIds });
}





}

