import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {HttpClient} from '@angular/common/http';
import {User} from '../auth/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  id: number;
  isAuthenticated: boolean;
  user: User = null;
  error: string = null;

  constructor(private authService: AuthService, private httpClient: HttpClient) { }

  fetchUser(){
    if(!this.id){ return }

    this.error = null;
    this.user = null;

    this.httpClient.get(`http://localhost:8080/api/users/${this.id}`, {headers: {'Authorization' : `Bearer ${localStorage.getItem('access_token')}`}})
      .subscribe((user: User) =>{
        this.user = new User(user.id, user.username, user.email);
      }, (err: any) =>{
        if(err.status === 400){
          this.error = err.error.message;
        } else if(err.status === 401){
          this.error = 'You are not authorized to view this information';
        } else{
          this.error = 'There was an error processing your request'
        }
      })
  }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.authService.authenticationChanged.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated
    });
  }

}
