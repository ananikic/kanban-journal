import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { TemplateDialogComponent } from './template-dialog/template-dialog.component';

@Component({
  selector: 'app-page-dialog',
  templateUrl: './page-dialog.component.html',
  styleUrls: ['./page-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PageDialogComponent {

  calendarTemplates: string[] = ['week', 'future log'];
  workTemplates: string[] = ['work', 'feynman studying'];
  wantsTemplates: string[] = ['shopping "lists"', 'to read', 'recipes'];
  youTemplates: string[] = ['feelings and thoughts'];

  constructor(public dialogRef: MatDialogRef<PageDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog ) { }

  onNoClick() {
    this.dialogRef.close();
  }

  onEnter(event: KeyboardEvent, result: []) {
    if (event.key == 'Enter') {
      this.dialogRef.close(result);
    }
  }

  openTemplate(template: string): void {
    this.dialog.open(TemplateDialogComponent, {
      width: '1400px',
      height: '650px',
      data: { template }
    });
  }

}
