// import { Injectable } from '@angular/core';
// import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// // import { AuthService } from './service/hardCodedAuth/AuthService';

// export const routeGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
//   const authService = new AuthService(); // Ensure to get AuthService instance properly
//   const router = new Router(); // Ensure to get Router instance properly

//   if (authService.isAuthenticated()) {
//     return true; // Allow access if authenticated
//   } else {
//     router.navigate(['/login']); // Redirect to login if not authenticated
//     return false; // Block access
//   }
// };
