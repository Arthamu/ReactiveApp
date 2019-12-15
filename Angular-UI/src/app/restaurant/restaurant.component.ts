import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Restaurants } from '../restaurants';
import { ReavtiveServiceService } from '../reavtive-service.service';
import { PageEvent } from '@angular/material/paginator';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css'],

  providers: [ReavtiveServiceService]
})
export class RestaurantComponent implements OnInit {
  restaurants: Observable<Restaurants[]>;
  selectedRes: Restaurants;
  breakpoint: number;
  constructor(private reactiveService: ReavtiveServiceService,private spinner: NgxSpinnerService) { }
  innerHeight:number;
  ngOnInit() {
    this.showSpinner();
    this.reactiveService.getStreamSize().subscribe(data => this.length=data);
    this.pageEvent = new PageEvent();
    this.innerHeight = window.innerHeight;
    this.pageEvent.pageIndex = 0;
    this.pageEvent.pageSize = 12;

    this.requestQuoteStream();
    this.breakpoint = (window.innerWidth <= 830) ? 1 : 4;

  }


  requestQuoteStream(): void {

    this.restaurants = this.reactiveService.getRestaurantsStream(this.pageEvent.pageIndex, this.pageEvent.pageSize);
  }

  onSelect(quote: Restaurants): void {
    this.selectedRes = quote;
  }
  // MatPaginator Inputs
  length = 100;
  pageSize = 12;
  pageSizeOptions: number[] = [4, 8, 16, 32,64,128];

  // MatPaginator Output
  pageEvent: PageEvent;


  public getServerData(event?: PageEvent):PageEvent {
    console.log(event)
    
    this.showSpinner();
    this.pageEvent=event;
    this.restaurants = this.reactiveService.getRestaurantsStream(this.pageEvent.pageIndex, this.pageEvent.pageSize);
    return this.pageEvent;

 
  }

  showSpinner() {
    this.spinner.show(undefined, { fullScreen:false});
    setTimeout(() => {
      this.spinner.hide();
    }, 3000);
  }
  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 830) ? 1 : 4;
  }

}

