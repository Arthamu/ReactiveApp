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
Size:Number=0;

  url: string = this.getHostname();
  urlPaged: string = this.url+'/getAllPaged';
  getHostname() : string {
    return this.window.location.protocol+"//"+ this.window.location.host;
}
  getRestaurantsStream(page?: number, size?: number): Observable<Array<Restaurants>> {
    this.Restaurantss = [];
    return Observable.create((observer) => {
      let url = this.url;
     
      if (page != null) {
        url = this.urlPaged + '?page=' + page + '&size=' + size;
      }else url=url+"/getAll";
      console.log(url);
      let eventSource = new EventSourcePolyfill(url,{ heartbeatTimeout: 10000, connectionTimeout: 10000 });
      eventSource.onmessage = (event) => {
        
        let Restaurants =JSON.parse(event.data);
   
        let random = Math.floor((Math.random() * 1000) + 200);
         let x =Restaurants.url.split('/');
         x[3]=random+'';
         Restaurants.url= x.join('/',x);
  
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
  getStreamSize() :  Observable<number>{

    return Observable.create((observer) => {
      let url = this.url;
      let eventSource = new EventSourcePolyfill(url+"/SizeOfList",{ heartbeatTimeout: 10000, connectionTimeout: 10000 });
      eventSource.onmessage = (event) => {

        
       let size:number=JSON.parse(event.data);
        observer.next(size);
      }
        
    });
  }

}

