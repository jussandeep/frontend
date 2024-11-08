import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './AuthService';
// import { AuthService } from './AuthService';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(
    
    private authService: AuthService, 
    private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true; // Allow access if authenticated
    } else {
      this.router.navigate(['/login']); // Redirect to login if not authenticate
      return false; // Block access
    }
  }
}
