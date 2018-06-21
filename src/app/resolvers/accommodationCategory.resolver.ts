import { CategoryService } from './../services/category.service';
import { CategoryView } from './../models/categoryView.model';
import { AdditionalServicesService } from './../services/additionalServices.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AdditionalServiceView } from '../models/additionalServiceView.model';


@Injectable()
export class AccommodationCategoryResolver implements Resolve<CategoryView[]> {
  constructor(
    private categoryService: CategoryService
  ){}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<CategoryView[]>{
    return this.categoryService.getAll();
  }
}
