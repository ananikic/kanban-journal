import { Component, OnInit, OnDestroy } from '@angular/core';
import { Board } from '../page.model';
import { PageService } from '../kanban-services/page.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { BoardService } from '../kanban-services/board.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit, OnDestroy {

  id?: string;
  title?: string;
  boards?: Board[];
  pageSub: Subscription;
  boardsSub: Subscription;

  constructor(private pageService: PageService, private boardService: BoardService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.pageSub = this.pageService.findUserPageById(this.id).subscribe(page => {
        this.title = page.get('title');
      });
      this.boardsSub = this.boardService.findBoards(this.id).subscribe(boards => this.boards = boards);
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.boards, event.previousIndex, event.currentIndex);
    this.pageService.sortBoards(this.boards, this.id);
  }

  ngOnDestroy() {
    this.pageSub.unsubscribe();
    this.boardsSub.unsubscribe();
  }

}
