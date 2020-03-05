import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-page-dialog',
  templateUrl: './page-dialog.component.html',
  styleUrls: ['./page-dialog.component.scss']
})
export class PageDialogComponent {

  templates: string[] = ['for this year', 'for this month', 'for today'];

  constructor(public dialogRef: MatDialogRef<PageDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick() {
    this.dialogRef.close();
  }

}
