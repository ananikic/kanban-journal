import { Page } from './../page.model';
import { PageIdService } from './../kanban-services/page-id.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Board } from '../page.model';
import { PageService } from '../kanban-services/page.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit, OnDestroy {

  id?: string;
  title?: string;
  boards?: Board[];
  sub: Subscription;

  constructor(private pageService: PageService, private pageIdService: PageIdService) { }

  ngOnInit() {
   this.pageIdService.currentId.subscribe(id => this.id = id);
   this.sub = this.pageService.findUserPageById(this.id).subscribe(page => {this.title = page.title;
                                                                            this.boards = page.boards; } );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
