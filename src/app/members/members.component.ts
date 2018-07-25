import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {UserProfile} from '../auth/user-profile.model';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  profile: UserProfile;

  constructor(private authService: AuthService) { }

  ngOnInit() {
      this.profile = this.authService.getProfile();
      this.authService.profileChanged.subscribe((profile: UserProfile) => {
       this.profile = profile
     });
  }

}
