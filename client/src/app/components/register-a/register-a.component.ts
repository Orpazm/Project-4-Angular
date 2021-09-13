import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-register-a',
  templateUrl: './register-a.component.html',
  styleUrls: ['./register-a.component.css']
})
export class RegisterAComponent implements OnInit {

  
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
      id: ["", [Validators.required, Validators.min(100000000)]],
      email: ["" ,[Validators.required, Validators.email]],
      password: ["", Validators.required],
      confirm_password: ["", Validators.required]
    })
  }

}
