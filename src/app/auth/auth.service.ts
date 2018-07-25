import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as auth0 from 'auth0-js';
import {Subject} from 'rxjs';
import {UserProfile} from './user-profile.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authenticationChanged: Subject<boolean> = new Subject<boolean>();
  profileChanged: Subject<UserProfile> = new Subject<UserProfile>();
  _profile: UserProfile = null;

  auth0 = new auth0.WebAuth({
    clientID: 's8bAzT3EqZOzUZ3X84jrHkiodPiYm61c',
    domain: 'lfallo1.auth0.com',
    responseType: 'token id_token',
    redirectUri: 'http://localhost:4200/callback',
    audience: 'http://localhost:8080'
  });

  constructor(public router: Router) { }

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.authenticationChanged.next(true);
        window.location.hash = '';
        this.setSession(authResult);
        this.setProfile();
        this.router.navigate(['/']);
      } else if (err) {
        this.router.navigate(['/']);
        console.log(err);
      }
    });
  }

  private setSession(authResult): void {
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // Go back to the home route
    this.authenticationChanged.next(false);
    this._profile = null;
    this.router.navigate(['/']);
  }

  public getProfile(){
    return this._profile;
  }

  private setProfile(): void {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      this.auth0.client.userInfo(accessToken, (err, profile) => {
        this._profile = profile;
        this.profileChanged.next(profile);
      });
    }
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
    return new Date().getTime() < expiresAt;
  }

  public checkAuth(): void {
    this.setProfile();
    this.authenticationChanged.next(this.isAuthenticated());
  }
}
