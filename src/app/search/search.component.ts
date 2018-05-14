import { AccommodationService } from './../services/accommodation.service';
import { AccommodationView } from './../models/accommodationView.model';
import { AdditionalServiceView } from './../models/additionalServiceView.model';
import { AdditionalServicesService } from './../services/additionalServices.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  additonalServices: AdditionalServiceView[];
  accommodationList: AccommodationView[];
  location: string = "";
  capacity: number = 0;

  getAdditionalServices(){
    this.additionalServicesService.getAll().subscribe(
      addServ => {
        this.additonalServices = addServ['content'];
      }
    );
  }

  searchSimple() {
    this.accommodationService.simpleSearch(this.location, this.capacity).subscribe(
      responseData => {
        this.accommodationList = responseData['content'];
      }
    )
  }

  constructor(
    private additionalServicesService: AdditionalServicesService,
    private accommodationService: AccommodationService
  ) { }

  ngOnInit() {
    this.getAdditionalServices();
  }

}
