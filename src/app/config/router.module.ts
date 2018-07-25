import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from '../home/home.component';
import {MembersComponent} from '../members/members.component';
import {CallbackComponent} from '../callback/callback.component';
import {IsAuthenticatedService} from '../auth/is-authenticated.service';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'members', component: MembersComponent, canActivate: [IsAuthenticatedService]},
  {path: 'callback', component: CallbackComponent}
]

@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class AppRouterModule {}
