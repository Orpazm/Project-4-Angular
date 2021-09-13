import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {

  constructor(public _data:DataService) { }
  
  ngOnInit(): void {
    this._data.getOrdersCount();
    this._data.getProdCount();
    this._data.getCart(this._data.userID);
  }

}
