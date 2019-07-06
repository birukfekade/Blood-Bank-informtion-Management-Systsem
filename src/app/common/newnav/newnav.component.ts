import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-newnav',
  templateUrl: './newnav.component.html',
  styleUrls: ['./newnav.component.css']
})
export class NewnavComponent implements OnInit {
  isIn = false;   // store state
  toggleState() { // click handler
    let bool = this.isIn;
    this.isIn = bool === false ? true : false;
  }

  constructor() { }

  ngOnInit() {
  }

}
