import { Injectable, Inject } from '@angular/core';

import {Restaurants} from './restaurants';
import { EventSourcePolyfill } from 'ng-event-source';
import { Observable } from 'rxjs';
import { JsonPipe } from '@angular/common';
import { WINDOW } from './windows.provider';

@Injectable({
  providedIn: 'root'
})
export class ReavtiveServiceService {

  constructor(@Inject(WINDOW) private window: Window) {
  }




  
  Restaurantss: Restaurants[] = [];
  url: string = 'https://'+this.getHostname();
  urlPaged: string = 'http://localhost:2005/getAllpaged';
  getHostname() : string {
    return this.window.location.hostname;
}
  getRestaurantsStream(page?: number, size?: number): Observable<Array<Restaurants>> {
    this.Restaurantss = [];
    return Observable.create((observer) => {
      let url = this.url;
      if (page != null) {
        url = this.urlPaged + '?page=' + page + '&size=' + size;
      }
      console.log(url);
      let eventSource = new EventSourcePolyfill(url+"/getAll",{ heartbeatTimeout: 1000, connectionTimeout: 1000 });
      eventSource.onmessage = (event) => {
        console.debug('Received event: ', event);
      
        console.log(event.data);
        
        let Restaurants =JSON.parse(event.data);
        console.log(Restaurants);
        let random = Math.floor((Math.random() * 1000) + 200);
         let x =Restaurants.url.split('/');
         x[3]=random+'';
         Restaurants.url= x.join('/',x);
        console.log(Restaurants);
        this.Restaurantss.push(Restaurants);
        observer.next(this.Restaurantss);
      };
      eventSource.onerror = (error) => {
        // readyState === 0 (closed) means the remote source closed the connection,
        // so we can safely treat it as a normal situation. Another way of detecting the end of the stream
        // is to insert a special element in the stream of events, which the client can identify as the last one.
        if(eventSource.readyState === 0) {
          console.log('The stream has been closed by the server.');
          eventSource.close();
          observer.complete();
        } else {
          observer.error('EventSource error: ' + error);
        }
      }
    });
  }

}

