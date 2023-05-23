import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WalltedialogComponent } from '../walltedialog/walltedialog.component';

@Component({
  selector: 'app-add-wallte-dialog',
  templateUrl: './add-wallte-dialog.component.html',
  styleUrls: ['./add-wallte-dialog.component.scss']
})
export class AddWallteDialogComponent {

  public  searchTerm:any = '';
  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(WalltedialogComponent);
   // alert()
  }

}
