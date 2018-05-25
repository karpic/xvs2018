import { DateParser } from './services/dateParser.service';
import { LoggedInGuard } from './auth/guards/loggedInGuard.service';
import { MessagesService } from './services/messages.service';
import { MockDataService } from './services/mockdata/mockdata.service';
import { CategoryService } from './services/category.service';
import { AdditionalServicesService } from './services/additionalServices.service';
import { DataService } from './services/dataService.service';
import { AccommodationService } from './services/accommodation.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './/app-routing.module';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { SearchComponent } from './search/search.component';
import { SearchListComponent } from './search/search-list/search-list.component';
import { AccommodationItemComponent } from './search/search-list/accommodation-item/accommodation-item.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { NewReservationComponent } from './reservations/new-reservation/new-reservation.component';
import { AccommodationViewComponent } from './views/accommodation-view/accommodation-view.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReservationsService } from './services/reservations.service';
import { UsersService } from './services/users.service';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { UserImpressionComponent } from './reservations/user-impression/user-impression.component';
import { MessagesComponent } from './reservations/messages/messages.component';
import { TokenStorage } from './services/auth/token.storage';
import { AuthService } from './services/auth/auth.service';
import { Interceptor } from './services/auth/interceptor';
import { UserImpressionService } from './services/userImpression.service';
import { AccommodationTypeService } from './services/accommodationType.service';
import { RegistrationConfirmationPageComponent } from './auth/register/registration-confirmation-page/registration-confirmation-page.component';
import { ReservationConfirmationPageComponent } from './reservations/new-reservation/reservation-confirmation-page/reservation-confirmation-page.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    SearchComponent,
    SearchListComponent,
    AccommodationItemComponent,
    ReservationsComponent,
    NewReservationComponent,
    AccommodationViewComponent,
    UserprofileComponent,
    UserImpressionComponent,
    MessagesComponent,
    RegistrationConfirmationPageComponent,
    ReservationConfirmationPageComponent,
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    AccommodationService,
    DataService,
    AdditionalServicesService,
    ReservationsService,
    CategoryService,
    UsersService,
    MockDataService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi : true
    },
    TokenStorage,
    AuthService,
    MessagesService,
    UserImpressionService,
    LoggedInGuard,
    AccommodationTypeService,
    DateParser
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
