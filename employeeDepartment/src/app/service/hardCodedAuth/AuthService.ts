import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
constructor(
  private router: Router,
){}
  // Method to check if user is authenticated by checking session storage
  // isAuthenticated(): boolean {
  //   console.log("autherService", sessionStorage)
  //   return !!sessionStorage.getItem('authenticaterUsers');
  // }


  // Store the token in localStorage/sessionStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Call this method after login to save the token
  setToken(token: string): void {
    // localStorage.setItem('access_token', token);
    localStorage.setItem('token', token);
  }

  isAuthenticated(): boolean {
    const value = sessionStorage.getItem('authenticaterUsers');
    console.log("AuthService sessionStorage:", value);
    return !!value;
  }
  // Optional: You can implement logout or other authentication-related logic here
  logout(): void {
    sessionStorage.removeItem('authenticaterUsers');
    localStorage.removeItem('token');
    console.log('User logged out, sessionStorage cleared');
    this.router.navigate(['/login']);
  }
}
