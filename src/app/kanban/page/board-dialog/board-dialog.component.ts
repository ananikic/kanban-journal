import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-board-dialog',
  templateUrl: './board-dialog.component.html',
  styleUrls: ['./board-dialog.component.scss']
})
export class BoardDialogComponent {

  constructor(public dialogRef: MatDialogRef<BoardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog ) { }

    onNoClick() {
      this.dialogRef.close();
    }
  
    onEnter(event: KeyboardEvent, result: []) {
      if (event.key === 'Enter') {
        this.dialogRef.close(result);
      }
    }

}
