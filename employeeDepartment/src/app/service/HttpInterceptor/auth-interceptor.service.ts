import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../hardCodedAuth/AuthService';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(
    private authservice: AuthService
  ) { }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.authservice.getToken();

  let clonedRequest = req;
  if (authToken) {
    clonedRequest = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken}`)
    });
  }

  return next.handle(clonedRequest).pipe(
    catchError((err: HttpErrorResponse) => {
      let errorMessage = '';
      
      // Handle 401 Unauthorized error, if ftoken expired or invalid
      // if (error.status === 500) {
      //   if (error.url?.includes('departmentDetails/postData')) {
      //     errorMessage = 'Transaction failed due to exception occurs in inserting employee';
      //       } else if (error.url?.includes('department')) {
      //         errorMessage = 'Transaction failed due to exception occurs in getting department';
      //       }
      //        else {
      //         errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      //       }
      //     } 
      //     else {
      //       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      //     }
      //------------------------------------------------------------------------
      //   if (err.status === 500 && err.error && err.error.message) {
           
      //     // errorMessage = `Error 500 (Internal Server Error)`;
      //     if (err.url?.includes('employeeDetails/save')) {
      //           errorMessage = 'Transaction failed due to exception occurs in inserting employee';
      //    } 
      //    else if (err.url?.includes('departmentDetails/postData')) {
      //     errorMessage = 'Transaction failed due to exception occurs in inserting department';
      //   }
      //  } else if (err.status === 403) {
      //       errorMessage = 'Bad request. Please check your input data.';
      //   } else {
      //       errorMessage = 'An unexpected error occurred: ';
      //   }
      //   return throwError(() => new Error(errorMessage));
      //   })
     // Check for specific status codes and messages
     if (err.status === 500) {
      if (err.url?.includes('departmentDetails/postData')) {
        errorMessage = err.error?.message || 'Transaction failed due to an exception while inserting department data.';

      } else if (err.url?.includes('depupDate')) {
        errorMessage = err.error?.message || 'Transaction failed due to an exception while updating department data.';
      
      }else if (err.url?.includes('deleteDepartmentData')){
        errorMessage = err.error?.message || 'Transaction failed due to an exception while delete department data.';
      
      }else{
        errorMessage = 'Error 500 (Internal Server Error): An internal server error occurred.';
      }



    } else if (err.status === 403) {
      errorMessage = 'Error 403 (Forbidden): Bad request. Please check your input data.';



    } else {
      errorMessage = err.error?.message || `An unexpected error occurred: ${err.message}`;
    }

    // Return the error message wrapped in an Error object
    return throwError(() => new Error(errorMessage));
  })
  );
  

}}