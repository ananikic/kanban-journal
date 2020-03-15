import { Page } from './../../kanban/page.model';
import { PageService } from './../../kanban/kanban-services/page.service';
import { Router } from '@angular/router';
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

  isPremade = false;
  page: Page;

  constructor(public dialog: MatDialog, private pageService: PageService, private db: AngularFirestore, private router: Router) { }

  ngOnInit() {
  }

  openPageDialog(): void {
    const dialogRef = this.dialog.open(PageDialogComponent, {
      width: '400px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(async result => {
      if (result[1]) {
        this.isPremade = true;
        this.page = await this.pageService.createPage(this.isPremade, result[1]);
      } else {
        this.page = await this.pageService.createPage(this.isPremade, result[0]);
      }
      this.router.navigate(['/page', this.page.id]);
    });
  }
}
