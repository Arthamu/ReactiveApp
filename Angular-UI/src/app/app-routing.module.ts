import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RestaurantComponent } from './restaurant/restaurant.component';


const routes: Routes = [
  
  { path: '',component: RestaurantComponent},
  { path: 'customer-list', component: RestaurantComponent },
  
  { path: 'calender', loadChildren: () => import('./calender/calender.module').then(m => m.CalenderModule) }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
