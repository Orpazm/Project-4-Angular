import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-dialog-alert',
  templateUrl: './dialog-alert.component.html',
  styleUrls: ['./dialog-alert.component.css']
})
export class DialogAlertComponent implements OnInit {

  constructor(
    public _data:DataService,
    public dialogRef: MatDialogRef <DialogAlertComponent>
  ) { }

  
  close() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
