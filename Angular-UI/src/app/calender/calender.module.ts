import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalenderRoutingModule } from './calender-routing.module';
import { CalenderComponent } from './calender.component';
import { AppModule } from 'bin/src/app/app.module';
import { AngularDraggableModule } from 'angular2-draggable';


@NgModule({
  declarations: [CalenderComponent],
  imports: [
    CommonModule,
    CalenderRoutingModule,
    AngularDraggableModule
  ]
})
export class CalenderModule { }
