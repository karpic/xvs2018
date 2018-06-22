import { AccommodationTypeService } from './../services/accommodationType.service';
import { AccommodationTypeView } from './../models/accommodationTypeView.model';
import { CategoryView } from './../models/categoryView.model';
import { AccommodationService } from './../services/accommodation.service';
import { AccommodationView } from './../models/accommodationView.model';
import { AdditionalServiceView } from './../models/additionalServiceView.model';
import { AdditionalServicesService } from './../services/additionalServices.service';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  additonalServices: AdditionalServiceView[];
  accommodationTypes: AccommodationTypeView[];
  categories: CategoryView[];
  accommodationList: AccommodationView[] = [];
  additionalSearchOptionsHidden: boolean = true;



  //simple search options
  location: string = "";
  capacity: number = 0;
  dateFrom: Date = new Date();
  dateTo: Date = new Date();


  //additionalSearchOptions
  searchCategoryName: CategoryView;
  searchAdditionalServices: AdditionalServiceView[] = [];
  searchAccommodationType: AccommodationTypeView;

  //search results
  numberOfPages: number;
  totalNumberOfElements: number;
  currentPage: number;

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

  getAccommodationTypes() {
    this.accommodationTypeService.getAll().subscribe(
      responseData => {
        this.accommodationTypes = responseData['content']
      }
    );
  }

  appendAdditionalServiceForSearch(service: AdditionalServiceView) {
    this.searchAdditionalServices.push(service);
  }

  searchButtonClicked() {
    if(this.additionalSearchOptionsHidden) {
      this.searchSimple(0);
    }
    else{
      this.searchAdditional(0);
    }
  }

  searchSimple(pageNumber: number) {
    this.accommodationService.simpleSearch(this.dateFrom, this.dateTo, this.location, this.capacity, pageNumber).subscribe(
      responseData => {
        this.accommodationList = responseData['content'];
        this.numberOfPages = responseData.totalPages;
        this.totalNumberOfElements = responseData.totalElements;
        this.currentPage = responseData.pageable.pageNumber;
      }
    )
  }

  searchAdditional(pageNumber: number) {
    this.accommodationService.advancedSearch(this.dateFrom, this.dateTo, this.location, this.capacity, this.searchAdditionalServices, this.searchAccommodationType.name, this.searchCategoryName, pageNumber).subscribe(
      responseData => {
        this.accommodationList = responseData['content'];
        this.numberOfPages = responseData.totalPages;
        this.totalNumberOfElements = responseData.totalElements;
        this.currentPage = responseData.pageable.pageNumber;
      }
    );
  }

  sortCategory(mode: string, pageNumber: number) {
    this.accommodationService.sortByCategory(this.dateFrom, this.dateTo, this.location, this.capacity, this.searchAdditionalServices, this.searchAccommodationType.name, this.searchCategoryName, pageNumber, mode).subscribe(
      responseData => {
        this.accommodationList = responseData['content'];
        this.numberOfPages = responseData.totalPages;
        this.totalNumberOfElements = responseData.totalElements;
        this.currentPage = responseData.pageable.pageNumber;
      }
    );
  }

  sortByRating(mode: string, pageNumber: number) {
    this.accommodationService.sortByRating(this.dateFrom, this.dateTo, this.location, this.capacity, this.searchAdditionalServices, this.searchAccommodationType.name, this.searchCategoryName, pageNumber, mode).subscribe(
      responseData => {
        this.accommodationList = responseData['content'];
        this.numberOfPages = responseData.totalPages;
        this.totalNumberOfElements = responseData.totalElements;
        this.currentPage = responseData.pageable.pageNumber;
      }
    );
  }

  nextPage() {
      if(this.additionalSearchOptionsHidden){
        this.currentPage = this.currentPage + 1;
        this.searchSimple(this.currentPage);
        window.scrollTo(0,0);
      }
      else{
        this.currentPage = this.currentPage + 1;
        this.searchAdditional(this.currentPage);
        window.scrollTo(0,0);
      }
  }

  previousPage() {
      if(this.additionalSearchOptionsHidden){
        this.currentPage = this.currentPage - 1;
        this.searchSimple(this.currentPage);
        window.scrollTo(0,0);
      }
      else{
        this.currentPage = this.currentPage - 1;
        this.searchAdditional(this.currentPage);
        window.scrollTo(0,0);
      }
  }



  constructor(
    private additionalServicesService: AdditionalServicesService,
    private accommodationService: AccommodationService,
    private categoryService: CategoryService,
    private accommodationTypeService: AccommodationTypeService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    /* this.getAdditionalServices();
    this.getCategories();
    this.getAccommodationTypes(); */
    this.additonalServices = this.route.snapshot.data['additionalServices']['content'];
    this.categories = this.route.snapshot.data['categories']['content'];
    this.accommodationTypes = this.route.snapshot.data['types']['content'];
  }

}
