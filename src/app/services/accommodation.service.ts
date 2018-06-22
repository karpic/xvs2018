import { CategoryView } from './../models/categoryView.model';
import { AdditionalServiceView } from './../models/additionalServiceView.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { AccommodationView } from '../models/accommodationView.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class AccommodationService {
  private baseUrl = 'http://localhost:8080/api/accommodation';
  private url = 'http://localhost:8080/api/accommodation/all?';

  //HEROKU
  private herokuBaseUrl = 'https://warm-badlands-25076.herokuapp.com/api/accommodation';
  private herokuUrl = 'https://warm-badlands-25076.herokuapp.com/api/accommodation/all?';

  findOne(id: number): Observable<any> {
    return this.http.get<any>(this.url + '=id:' + id, httpOptions);
  }

  simpleSearch(dateFrom: Date, dateTo: Date, location: string, numOfPeople: number, pageNumber: number): Observable<any> {
    return this.http.get<any>(this.herokuUrl + 'location=' + location + '&capacity=' + numOfPeople + '&page=' + pageNumber + '&size=5&sort=name,desc', httpOptions);
  }

  advancedSearch(dateFrom: Date, dateTo: Date, location: string, numOfPeople: number, services: AdditionalServiceView[], accommodationType: string, accommodationCategory: CategoryView, pageNumber: number): Observable<any> {
    let searchUrl: string = this.herokuUrl;
    //append dates (from ,to)
    /* searchUrl = searchUrl + 'from=' + this.reverseDate(dateFrom);
    searchUrl = searchUrl + '&to=' + this.reverseDate(dateTo); */

    //appendLocation
    searchUrl = searchUrl + 'location=' + location;
    //append numOfPeople
    searchUrl = searchUrl + '&capacity=' + numOfPeople;

    //append additional services
    for (let service of services) {
      searchUrl = searchUrl + '&service=' + service.serviceName;
    }

    //append accommodationType
    searchUrl = searchUrl + '&type=' + accommodationType;
    //append category
    searchUrl = searchUrl + '&category=' + accommodationCategory.name;

    searchUrl = searchUrl + '&page=' + pageNumber + '&size=5&sort=name,desc'
    console.log(searchUrl);

    return this.http.get<any>(searchUrl, httpOptions);
  }

  sortByCategory(dateFrom: Date, dateTo: Date, location: string, numOfPeople: number, services: AdditionalServiceView[], accommodationType: string, accommodationCategory: CategoryView, pageNumber: number, mode: string): Observable<any>{
    let searchUrl: string = this.herokuUrl;

    //append dates (from ,to)
  /*   searchUrl = searchUrl + 'from=' + this.reverseDate(dateFrom);
    searchUrl = searchUrl + '&to=' + this.reverseDate(dateTo); */

    //appendLocation
    searchUrl = searchUrl + 'location=' + location;
    //append numOfPeople
    searchUrl = searchUrl + '&capacity=' + numOfPeople;

    //append additional services
    for (let service of services) {
      searchUrl = searchUrl + '&service=' + service.serviceName;
    }

    //append accommodationType
    searchUrl = searchUrl + '&type=' + accommodationType;
    //append category
    searchUrl = searchUrl + '&category=' + accommodationCategory.name;

    //searchUrl = searchUrl + '&page=' + pageNumber + '&size=5&sort=name,desc'
    searchUrl = searchUrl + '&page=' + pageNumber + '&size=5&sort=category' + ','+mode;
    console.log(searchUrl);

    return this.http.get<any>(searchUrl, httpOptions);
  }

  sortByRating(dateFrom: Date, dateTo: Date, location: string, numOfPeople: number, services: AdditionalServiceView[], accommodationType: string, accommodationCategory: CategoryView, pageNumber: number, mode: string): Observable<any>{
    let searchUrl: string = this.herokuUrl;

    //append dates (from ,to)
   /*  searchUrl = searchUrl + 'from=' + this.reverseDate(dateFrom);
    searchUrl = searchUrl + '&to=' + this.reverseDate(dateTo); */

    //appendLocation
    searchUrl = searchUrl + 'location=' + location;
    //append numOfPeople
    searchUrl = searchUrl + '&capacity=' + numOfPeople;

    //append additional services
    for (let service of services) {
      searchUrl = searchUrl + '&service=' + service.serviceName;
    }

    //append accommodationType
    searchUrl = searchUrl + '&type=' + accommodationType;
    //append category
    searchUrl = searchUrl + '&category=' + accommodationCategory.name;

    //searchUrl = searchUrl + '&page=' + pageNumber + '&size=5&sort=name,desc'
    searchUrl = searchUrl + '&page=' + pageNumber + '&size=5&sort=rating' + ','+mode;
    console.log(searchUrl);

    return this.http.get<any>(searchUrl, httpOptions);
  }

  reverseDate(d: Date): string{
    let retVal = '';
    retVal = retVal + d.getDay() + '-';
    retVal = retVal + d.getMonth() + '-';
    retVal = retVal + d.getFullYear();
    console.log(retVal);
    return retVal;
  }

  getOne(id: number): Observable<AccommodationView> {
    return this.http.get<AccommodationView>(this.herokuBaseUrl + '?id=' + id, httpOptions);
  }

  constructor(
    private http: HttpClient
  ) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption


      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
