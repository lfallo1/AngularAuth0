import {Component, OnInit} from '@angular/core';
import {AuthService} from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isAuthenticated: boolean;

  constructor(public authService: AuthService){}

  login(){
    this.authService.login();
  }

  logout(){
    this.authService.logout();
  }

  ngOnInit(): void {
    this.authService.authenticationChanged.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated
    });
    this.authService.checkAuth();
  }
}
