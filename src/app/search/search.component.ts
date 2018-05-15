import { CategoryView } from './../models/categoryView.model';
import { AccommodationService } from './../services/accommodation.service';
import { AccommodationView } from './../models/accommodationView.model';
import { AdditionalServiceView } from './../models/additionalServiceView.model';
import { AdditionalServicesService } from './../services/additionalServices.service';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  additonalServices: AdditionalServiceView[];
  categories: CategoryView[];
  accommodationList: AccommodationView[] = [];
  additionalSearchOptionsHidden: boolean = true;



  //simple search options
  location: string = "";
  capacity: number = 0;


  //additionalSearchOptions
  searchCategoryName: CategoryView;
  searchAdditionalServices: AdditionalServiceView[] = [];
  searchAccommodationType: string;

  //search results
  numberOfPages: number;
  totalNumberOfElements: number;

  getAdditionalServices(){
    this.additionalServicesService.getAll().subscribe(
      responseData => {
        this.additonalServices = responseData['content'];
      }
    );
  }

  getCategories() {
    this.categoryService.getAll().subscribe(
      responseData => {
        this.categories = responseData['content']
      }
    );
  }

  appendAdditionalServiceForSearch(service: AdditionalServiceView) {
    this.searchAdditionalServices.push(service);
  }

  searchButtonClicked() {
    if(this.additionalSearchOptionsHidden) {
      this.searchSimple();
    }
    else{
      this.searchAdditional();
    }
  }

  searchSimple() {
    this.accommodationService.simpleSearch(this.location, this.capacity, 0).subscribe(
      responseData => {
        this.accommodationList = responseData['content'];
        this.numberOfPages = responseData.pageable.pageNumber;
        this.totalNumberOfElements = responseData.totalElements;
      }
    )
  }

  searchAdditional() {
    this.accommodationService.advancedSearch(this.location, this.capacity, this.searchAdditionalServices, this.searchAccommodationType, this.searchCategoryName, 0).subscribe(
      responseData => {
        this.accommodationList = responseData['content'];
        this.numberOfPages = responseData.pageable.pageNumber;
        this.totalNumberOfElements = responseData.totalElements;
      }
    );
  }

  constructor(
    private additionalServicesService: AdditionalServicesService,
    private accommodationService: AccommodationService,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.getAdditionalServices();
    this.getCategories();
  }

}
