import { SearchComponent } from './search/search.component';
import { LoginComponent } from './auth/login/login.component';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, Router, RouterModule } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';

const routes: Routes = [
 { path: 'login', component: LoginComponent },
 { path: 'register', component: RegisterComponent},
 { path: 'search', component: SearchComponent }
];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forRoot(routes)
  ],
  declarations: []
})
export class AppRoutingModule { }
