import { Component, OnInit, OnDestroy } from '@angular/core';
import { Board } from '../page.model';
import { PageService } from '../kanban-services/page.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private pageService: PageService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    })
    this.sub = this.pageService.findUserPageById(this.id).subscribe(page => {
      this.title = page.get('title');
      this.boards = page.get('boards');
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
