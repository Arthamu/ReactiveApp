import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent implements OnInit {

  constructor() { }

  headers:any;
  today:any;
  task:any;
  ngOnInit() {
  this.headers=[];
   let d:Date;
  d =new Date();
  this.today=d.getDate();
  d.setDate((d.getDate()-10))
    this.headers[0]="Task Name";
  for (let index = 1; index < 21; index++) {
  this.headers[index]=new Date(d);
    d.setDate(d.getDate()+1);
    
  }
  this.task=[];
  for (let index = 0; index < 10; index++) {
    this.task[index]={
      name:"My Task "+index,
      start: new Date(),
      end : d
    }
    console.log(this.task);
    
    
  }
 

}


}
