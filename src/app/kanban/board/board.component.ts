import { Component, OnInit, Input } from '@angular/core';
import { Board, Task } from '../page.model';
import { CdkDragDrop, transferArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';
import { BoardService } from '../kanban-services/board.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  @Input() board: Board;
  @Input() pageBoards: Board[];
  @Input() pageId: string;

  constructor(private boardService: BoardService) { }

  ngOnInit() {
  }

  getConnectedList(): string[] {
    return this.pageBoards.map(b => b.id);
  }

  taskDrop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.boardService.sortBoardTasks(event.container.data, this.pageId, this.board.id)
    }
    else {
      const previousBoardId = event.previousContainer.id;
      const currentBoardId = event.container.id;
      const removedTask = event.previousContainer.data[event.previousIndex];
      const currentTasks = event.container.data;
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      this.boardService.transferTask(previousBoardId, currentBoardId, removedTask, currentTasks, this.pageId);
    }
  }
}
