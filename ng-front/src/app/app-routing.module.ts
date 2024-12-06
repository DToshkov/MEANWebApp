import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PostListComponent} from "./posts/post-list/post-list.component";
import {CreatePostComponent} from "./posts/create-post/create-post.component";
import {LoginComponent} from "./auth/login/login.component";
import {SignupComponent} from "./auth/signup/signup.component";
import{authGuard} from "./auth/auth.guard";

const routes: Routes = [
  {path: '', component: PostListComponent},
  {path: 'create', component: CreatePostComponent, canActivate:[authGuard]},
  {path: 'edit/:postId', component: CreatePostComponent, canActivate:[authGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent}
  //using a link refrence to the component
  //when you click on this path, open this component
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
//create new component, implement the routing, new component will use the service, and call my API - Pulls
// pulls key values, usually an ID, but can leave as any, how to parse within get
