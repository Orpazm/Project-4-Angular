import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {

  public myForm: FormGroup
  
  constructor(
    public _data:DataService,
    public _fb:FormBuilder
  ) { }

  closeAddForm(){
    this._data.addProdClicked = false
  }

  ngOnInit(): void {
    this.myForm = this._fb.group({
      product_name: ["", Validators.required],
      category_id: ["", Validators.required],
      price: ["", Validators.required],
      img: ["" ,Validators.required],
    })
  }

}
