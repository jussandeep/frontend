import { Component } from '@angular/core';
import { AuthService } from '../service/hardCodedAuth/AuthService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

constructor(
  private authservice: AuthService,
){}
  onlogout(){
    this.authservice.logout();
    // this.router.navigate(['login'])
  }
}
