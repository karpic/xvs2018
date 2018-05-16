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

  getAccommodation(){
    this.accommodationService.getOne(this.id).subscribe(
      (responseData) => {this.accommodation = responseData;
      console.log(this.accommodation);}
    )
  }

  constructor(
    private route: ActivatedRoute,
    private accommodationService: AccommodationService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params["id"];
      }
    );
    this.getAccommodation();
  }

}
