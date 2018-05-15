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
import { ReservationViewComponent } from './views/reservation-view/reservation-view.component';
import { HttpClientModule } from '@angular/common/http';
import { ReservationsService } from './services/reservations.service';


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
    ReservationViewComponent
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
    CategoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
