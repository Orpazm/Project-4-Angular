import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { DialogAlertComponent } from '../dialog-alert/dialog-alert.component';

@Component({
  selector: 'app-dialog-order',
  templateUrl: './dialog-order.component.html',
  styleUrls: ['./dialog-order.component.css']
})
export class DialogOrderComponent implements OnInit {

  constructor(
    public _data:DataService,
    public dialogRef: MatDialogRef <DialogAlertComponent>,
    public _r:Router
  ) { }

  public user_id:string = this._data.userID

  close() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    
  }

}
