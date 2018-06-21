import { AccommodationService } from './../services/accommodation.service';
import { AccommodationView } from './../models/accommodationView.model';
import { AdditionalServicesService } from './../services/additionalServices.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AdditionalServiceView } from '../models/additionalServiceView.model';


@Injectable()
export class SingleAccommodationResolver implements Resolve<AccommodationView> {
  constructor(
    private accommodationService: AccommodationService
  ){}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<AccommodationView>{
    return this.accommodationService.getOne(+route.paramMap.get('id'));
  }
}
