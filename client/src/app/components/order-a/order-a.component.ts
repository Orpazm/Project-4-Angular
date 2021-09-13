import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HighllightPipe } from 'src/app/pipes/highllight.pipe';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-order-a',
  templateUrl: './order-a.component.html',
  styleUrls: ['./order-a.component.css'],
  providers: [HighllightPipe]
})
export class OrderAComponent implements OnInit {

  public myForm: FormGroup 

  constructor(
    public _data:DataService,
    public _r:Router,
    public _fb:FormBuilder
  ) { }

  ngOnInit(): void {
    this.myForm = this._fb.group({
      search: [""]
    })
  }

}
