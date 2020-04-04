import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { PageDialogComponent } from '../page-dialog.component';

@Component({
  selector: 'app-template-dialog',
  templateUrl: './template-dialog.component.html',
  styleUrls: ['./template-dialog.component.scss']
})
export class TemplateDialogComponent implements OnInit {

  templateName: string;

  constructor(public dialogRef: MatDialogRef<PageDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog) { }

  onNoClick() {
    this.dialogRef.close();
  }
  ngOnInit() {
    this.templateName = this.data.template;
  }


}
