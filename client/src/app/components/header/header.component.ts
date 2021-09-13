import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public myForm: FormGroup 

  constructor(
    public _data:DataService,
    public _r:Router,
    public _fb:FormBuilder
    ) { }

    delToken() {
        return localStorage.removeItem('token')
    }

  ngOnInit(): void {
    this.myForm = this._fb.group({
      prod: [""]
    })
  }

}
