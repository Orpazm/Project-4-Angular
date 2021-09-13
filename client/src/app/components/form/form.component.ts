import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import ProdModel from 'src/app/model/prod.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public myForm: FormGroup 

  constructor(
    public _data:DataService,
    public _fb:FormBuilder
  ) { }

  
  CloseEdit(){
    this._data.isEditClicked = false
  }

  ngOnInit(): void {
    this.myForm = this._fb.group({
      id: [this._data.currProduct.id],
      product_name: [this._data.currProduct.product_name, Validators.required],
      category_id: [this._data.currProduct.category_id, Validators.required],
      price: [this._data.currProduct.price, Validators.required],
      img: [this._data.currProduct.img ,Validators.required],
    })
  }

}
