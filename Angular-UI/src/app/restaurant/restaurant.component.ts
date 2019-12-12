import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Restaurants } from '../restaurants';
import { ReavtiveServiceService } from '../reavtive-service.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css'],

  providers:[ReavtiveServiceService]
})
export class RestaurantComponent implements OnInit {
  restaurants : Observable<Restaurants[]>;
  selectedRes: Restaurants;

  constructor( private reactiveService: ReavtiveServiceService) { }

  ngOnInit() {
  }


  requestQuoteStream(): void {

      this.restaurants = this.reactiveService.getRestaurantsStream();
    }

    onSelect(quote: Restaurants): void {
      this.selectedRes = quote;
    }
  }

