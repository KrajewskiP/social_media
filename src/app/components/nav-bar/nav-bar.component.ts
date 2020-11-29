import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  currentUser: any;

  constructor(
    private authService: AuthService,
    private router: Router) {
    // this.authService.currentUser.subscribe(user => this.currentUser = "user");
    this.currentUser = "user";
   }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  isLoggedIn():boolean {
    return this.authService.isLogged();
  }
}
