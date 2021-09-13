import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

interface City {
  value: string;
}

@Component({
  selector: 'app-register-b',
  templateUrl: './register-b.component.html',
  styleUrls: ['./register-b.component.css']
})


export class RegisterBComponent implements OnInit {

  public myForm: FormGroup 

  selectedCity: string;

  cities: City[]= [
    {value: 'Ness-ziona'},
    {value: 'Rehovot'},
    {value: 'Tel-Aviv'},
    {value: 'Haifa'},
    {value: 'Herzliya'},
    {value: 'Jerusalem'} 
  ]


  constructor(
    public _data:DataService,
    public _fb:FormBuilder,
    public _r:Router 
  ) { }

  ngOnInit(): void {
    this.myForm = this._fb.group({
      id: [this._data.ID],
      city: ["", [Validators.required]],
      street: ["" ,[Validators.required]],
      name: ["", Validators.required],
      surname: ["", Validators.required]
    })
  }

}
