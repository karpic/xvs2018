import { DateParser } from './../../services/dateParser.service';
import { DataService } from './../../services/dataService.service';
import { AccommodationTypeView } from './../../models/accommodationTypeView.model';
import { AccommodationView } from './../../models/accommodationView.model';
import { AccommodationService } from './../../services/accommodation.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-accommodation-view',
  templateUrl: './accommodation-view.component.html',
  styleUrls: ['./accommodation-view.component.css']
})
export class AccommodationViewComponent implements OnInit {
  id: number;
  accommodation: AccommodationView = new AccommodationView(1,'','','','',[],1,[],[],'',[],'',[]);
  currentPrice: number;
  pricePlanHidden: boolean;
  rating: number;

  getAccommodation(){
    this.accommodationService.getOne(this.id).subscribe(
      (responseData) => {
        this.accommodation = responseData;
        //this.checkCurrentPrice();
        this.calculateRating();
        this.calculateCurrentPrice();
    }
    )
  }

  //jebo sam joj majku
  calculateCurrentPrice() {
    const currentDate: Date = new Date();
    const currentDateISO: Date = new Date(currentDate.toISOString());
    for(let pricePlan of this.accommodation.pricePlan){
      let curr = new Date(currentDateISO);
      let starting = new Date(this.dateParser.parseDateSimple(pricePlan.startingDate.toString()));
      let ending = new Date(this.dateParser.parseDateSimple(pricePlan.endingDate.toString()));
      if(curr > starting && curr < ending){
        this.currentPrice = pricePlan.price;
      }
    }
  }

  calculateRating() {
    let sum = 0;
    let numOfEl = 0;
    for(let review of this.accommodation.userImpressions){
      sum = sum + review.rating;
      numOfEl = numOfEl + 1;
    }
    this.rating = sum/numOfEl;
  }

  counter(i: number) {
    return new Array(i);
  }

  reservationClicked() {
    this.dataService.changeAccommodationView(this.accommodation);
    this.router.navigate(['newreservation']);
  }

  constructor(
    private route: ActivatedRoute,
    private accommodationService: AccommodationService,
    private dataService: DataService,
    private router: Router,
    private dateParser: DateParser
  ) {
    this.pricePlanHidden = true;
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params["id"];
      }
    );
    this.getAccommodation();
  }

}
