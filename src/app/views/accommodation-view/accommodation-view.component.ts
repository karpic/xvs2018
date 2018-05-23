import { AccommodationTypeView } from './../../models/accommodationTypeView.model';
import { AccommodationView } from './../../models/accommodationView.model';
import { AccommodationService } from './../../services/accommodation.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-accommodation-view',
  templateUrl: './accommodation-view.component.html',
  styleUrls: ['./accommodation-view.component.css']
})
export class AccommodationViewComponent implements OnInit {
  id: number;
  accommodation: AccommodationView = new AccommodationView(1,'','','','',[],1,[],[],'',[],'');
  currentPrice: number;
  pricePlanHidden: boolean;

  getAccommodation(){
    this.accommodationService.getOne(this.id).subscribe(
      (responseData) => {
        this.accommodation = responseData;
        this.checkCurrentPrice();
    }
    )
  }

  checkCurrentPrice() {
    let currentDate = new Date();
    for(let pricePlan of this.accommodation.pricePlan) {
      if(currentDate > pricePlan.startingDate && currentDate < pricePlan.endingDate){
        this.currentPrice = pricePlan.price;
        break;
      }
    }
  }

  constructor(
    private route: ActivatedRoute,
    private accommodationService: AccommodationService
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
