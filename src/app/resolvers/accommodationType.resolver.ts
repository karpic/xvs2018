import { AccommodationTypeService } from './../services/accommodationType.service';
import { AccommodationTypeView } from './../models/accommodationTypeView.model';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class AccommodationTypeResolver implements Resolve<AccommodationTypeView[]> {
  constructor(
    private accommodationTypeService: AccommodationTypeService
  ){}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<AccommodationTypeView[]>{
    return this.accommodationTypeService.getAll();
  }
}
