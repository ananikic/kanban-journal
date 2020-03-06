import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { TemplateDialogComponent } from './template-dialog/template-dialog.component';

@Component({
  selector: 'app-page-dialog',
  templateUrl: './page-dialog.component.html',
  styleUrls: ['./page-dialog.component.scss']
})
export class PageDialogComponent {

  calendarTemplates: string[] = [ 'day', 'week', 'month', 'year', 'future'];
  workTemplates: string[] = ['work', 'feynman studying'];
  wantsTemplates: string[] = ['shopping "list"', 'to read', 'recipes'];
  youTemplates: string[] = ['feelings and thoughts']

  constructor(public dialogRef: MatDialogRef<PageDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog ) { }

  onNoClick() {
    this.dialogRef.close();
  }

  openTemplate(template: string): void {
    console.log(template)
    this.dialog.open(TemplateDialogComponent, {
      width: '1400px',
      height: '650px',
      data: { template }
    });
  }

}
