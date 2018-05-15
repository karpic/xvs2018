import { AccommodationView } from './../../models/accommodationView.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css']
})
export class SearchListComponent implements OnInit {
  @Input() accommodationList: AccommodationView[];
  @Input() numberOfPages: number;
  @Input() numberOfElements: number;
  constructor() { }

  ngOnInit() {
  }

}
