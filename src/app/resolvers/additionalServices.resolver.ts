import { AdditionalServicesService } from './../services/additionalServices.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AdditionalServiceView } from '../models/additionalServiceView.model';


@Injectable()
export class AdditionalServicesResolver implements Resolve<AdditionalServiceView[]> {
  constructor(
    private additionalServicesService: AdditionalServicesService
  ){}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<AdditionalServiceView[]>{
    return this.additionalServicesService.getAll();
  }
}
