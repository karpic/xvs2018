import { SingleAccommodationResolver } from './resolvers/singleAccommodation.resolver';
import { AccommodationTypeResolver } from './resolvers/accommodationType.resolver';
import { AdditionalServicesResolver } from './resolvers/additionalServices.resolver';
import { LoggedInGuard } from './auth/guards/loggedInGuard.service';
import { MessagesComponent } from './reservations/messages/messages.component';
import { UserImpressionComponent } from './reservations/user-impression/user-impression.component';
import { NewReservationComponent } from './reservations/new-reservation/new-reservation.component';
import { SearchComponent } from './search/search.component';
import { LoginComponent } from './auth/login/login.component';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, Router, RouterModule, CanActivate } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { AccommodationViewComponent } from './views/accommodation-view/accommodation-view.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { AccommodationCategoryResolver } from './resolvers/accommodationCategory.resolver';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'search',
    component: SearchComponent,
    resolve: {
      categories: AccommodationCategoryResolver,
      additionalServices: AdditionalServicesResolver,
      types: AccommodationTypeResolver
    }
  },
  {
    path: 'accommodation/:id',
    component: AccommodationViewComponent,
    resolve: {
      accommodationData: SingleAccommodationResolver
    }
  },
  { path: 'newreservation', component: NewReservationComponent, canActivate: [LoggedInGuard] },
  {
    path: 'userprofile', component: UserprofileComponent, canActivate: [LoggedInGuard], children: [
      { path: 'reservations', component: ReservationsComponent },
      //component path below are for testing purposes
      { path: 'review', component: UserImpressionComponent },
      { path: 'messages', component: MessagesComponent }
    ]
  }
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
