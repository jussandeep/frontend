import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { userInfoBackendFields } from 'src/models/forgotpasswordfields';
import { userInfo } from 'src/models/signupUserfields';

@Injectable({
  providedIn: 'root'
})
export class GetuserdataService {

  private baseUrl="http://localhost:8082";
  constructor(
    private http: HttpClient,
  ) { }
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
}

  getAllUserInformation(): Observable<userInfo[]>{
return this.http.get<userInfo[]>(`${this.baseUrl}/getAllSignupInformation`)
  }



  updateForgotPassword( data:userInfoBackendFields){
    console.log(data)
    return this.http.put(`${this.baseUrl}/frontendUserInfoUpdate/${data.email}`, data ).pipe(
      catchError(this.handleError)
  );
  }

}