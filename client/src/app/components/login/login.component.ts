import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public myForm: FormGroup 

  hide = true;

  constructor(
    public _data:DataService,
    public _fb:FormBuilder,
    public _r:Router 
  ) { }

  getErrorMessage() {
    if (this.myForm.controls.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.myForm.controls.email.hasError('email') ? 'Not a valid email' : '';
  }

  
  ngOnInit(): void {
    this.myForm = this._fb.group({
      email: ["" ,[Validators.required, Validators.email]],
      password: ["", Validators.required]
    })
  }

}
