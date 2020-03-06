import { Router } from '@angular/router';
import { PageService } from './../page.service';
import { PageDialogComponent } from './page-dialog/page-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  constructor(public dialog: MatDialog, private pageService: PageService, private db: AngularFirestore, private router: Router) { }

  ngOnInit() {
  }

  openPageDialog(): void {
    const dialogRef = this.dialog.open(PageDialogComponent, {
      width: '400px',
      data: { }
    });
    dialogRef.afterClosed().subscribe( result => {
      if (result) {
        const pageId = this.db.createId();
        this.pageService.createPage({
          id: pageId,
          title: result
        });
        this.router.navigate(['/page', { id: pageId }]);
      }
    });
  }

}
