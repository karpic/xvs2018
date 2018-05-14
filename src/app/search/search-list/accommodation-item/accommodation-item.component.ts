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

  readMoreClicked() {
    this.dataService.changeAccommodationView(this.accommodation);
  }

  reservationClicked() {
    this.dataService.changeAccommodationView(this.accommodation);
    this.router.navigate(['newreservation']);
  }

  constructor(
    private dataService: DataService,
    private router: Router
  ) { }

  ngOnInit() {
  }

}
