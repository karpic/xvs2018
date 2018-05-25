import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class DateParser {
  parseDateFull(dateString: string): Date {
    var yearArray: string[] = dateString.split(" ")[0].split("-");
    var returnDate = new Date();
    returnDate.setDate(+yearArray[0]);
    returnDate.setMonth(+yearArray[1] - 1);
    returnDate.setFullYear(+yearArray[2]);

    var timeArray: string[] = dateString.split(" ")[1].split(":");
    returnDate.setHours(+timeArray[0]);
    returnDate.setMinutes(+timeArray[1]);
    returnDate.setSeconds(+timeArray[2]);

    return returnDate;
  }

  parseDateSimple(dateString: string) {
    var yearArray: string[] = dateString.split(" ")[0].split("-");
    var returnDate = new Date();

    returnDate.setDate(+yearArray[0]);
    returnDate.setMonth(+yearArray[1] - 1);
    returnDate.setFullYear(+yearArray[2]);
    return returnDate;
  }

  parseDateSimpleYearFirst(dateString: string) {
    var yearArray: string[] = dateString.split(" ")[0].split("-");
    var returnDate = new Date();

    returnDate.setDate(+yearArray[2]);
    returnDate.setMonth(+yearArray[1] - 1);
    returnDate.setFullYear(+yearArray[0]);
    return returnDate;
  }
}
