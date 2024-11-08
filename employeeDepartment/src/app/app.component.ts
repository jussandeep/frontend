import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DrawerSelectEvent } from '@progress/kendo-angular-layout';
import { menuIcon, SVGIcon, ungroupIcon, userIcon } from '@progress/kendo-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
//   title = 'employeeDepartment';
//   public menuIcon: SVGIcon = menuIcon;
// drawer: any;

//   constructor(private router: Router) {
//     // this.items = this.mapItems(router.config as Item[]);
//     // this.items[0].selected = true;
//   }

//   //sidebar  
//   public sidebarOpened=true;
//  // router: any;
// //menuSvg: SVGIcon;
//   public toggleSidebar(){
//     this.sidebarOpened=!this.sidebarOpened;
//   }

// public expanded = true;
// //public items: Array<Item> = [];

// public onSelect(ev: DrawerSelectEvent): void {
//   this.router.navigate([ev.item.path]);
// }

// public items: Array<Item> = [
//   {
//     text: 'Employees',
//     svgIcon: userIcon,
//     path: '/employees'
//   },
//   {
//     text: 'Departmetns',
//     svgIcon:ungroupIcon,
//     path: '/departments'
//   }
// ];

// // public mapItems(routes: Item[]): Item[] {
// //   return routes.map((item) => {
// //     return {
// //       text: item.text,
// //       svgIcon: item.svgIcon,
// //       path: item.path ? item.path : "",
// //     };
// //   });
// // }


// isLoggedIn = false;

// // Call this function when the user logs in
// login() {
//   this.isLoggedIn = true;
// }
// logOut() {
//  this.isLoggedIn=false;
//  this.router.navigate(['/login']);
// }

// }

// interface Item {
// text: string;
// svgIcon: SVGIcon;
// path: string;
// selected?: boolean;
}
