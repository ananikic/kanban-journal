import { Page } from '../../kanban/page.model';
import { PageService } from '../../kanban/kanban-services/page.service';
import { Router } from '@angular/router';
import { PageDialogComponent } from './page-dialog/page-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/firestore';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {

  isPremade = false;
  page: Page;

  constructor(public dialog: MatDialog, private pageService: PageService, private db: AngularFirestore, private router: Router) { }

  ngOnInit() {
  }

  openPageDialog(): void {
    const dialogRef = this.dialog.open(PageDialogComponent, {
      width: '400px',
      data: {},
      restoreFocus: false
    });
    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        if (result[1]) {
          this.isPremade = true;
        }
        this.page = await this.pageService.createPage(this.isPremade, result[0], result[1]);
        this.router.navigate(['/page', this.page.id]);
      }
    });
  }
}
