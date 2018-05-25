import { DateParser } from './../../../services/dateParser.service';
import { DataService } from './../../../services/dataService.service';
import { AccommodationView } from './../../../models/accommodationView.model';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accommodation-item',
  templateUrl: './accommodation-item.component.html',
  styleUrls: ['./accommodation-item.component.css']
})
export class AccommodationItemComponent implements OnInit {
  @Input() accommodation: AccommodationView;
  @Input() displayReservationButton: boolean;
  price: number;

  calculateCurrentPrice() {
    const currentDate: Date = new Date();
    const currentDateISO: Date = new Date(currentDate.toISOString());
    for(let pricePlan of this.accommodation.pricePlan){
      let curr = new Date(currentDateISO);
      let starting = new Date(this.dateParser.parseDateSimple(pricePlan.startingDate.toString()));
      let ending = new Date(this.dateParser.parseDateSimple(pricePlan.endingDate.toString()));
      if(curr > starting && curr < ending){
        this.price = pricePlan.price;
      }
    }
  }


  readMoreClicked() {
    this.router.navigate(['/accommodation/'+this.accommodation.id]);
  }

  reservationClicked() {
    this.dataService.changeAccommodationView(this.accommodation);
    this.router.navigate(['newreservation']);
  }

  constructor(
    private dataService: DataService,
    private router: Router,
    private dateParser: DateParser
  ) { }

  ngOnInit() {
    this.calculateCurrentPrice();
  }

}
