import { Component, OnInit, Input } from '@angular/core';
import { Board, Task } from '../page.model';
import { CdkDragDrop, transferArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';
import { TaskService } from '../kanban-services/task.service';
import { TaskDialogComponent } from '../task/task-dialog/task-dialog.component';
import { MatDialog } from '@angular/material/dialog';
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

  constructor(private boardService: BoardService, private taskService: TaskService, private dialog: MatDialog) { }

  ngOnInit() {
  }

  getConnectedList(): string[] {
    return this.pageBoards.map(b => b.id);
  }

  taskDrop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.taskService.sortBoardTasks(event.container.data, this.pageId, this.board.id);
    } else {
      const previousBoardId = event.previousContainer.id;
      const currentBoardId = event.container.id;
      const removedTask = event.previousContainer.data[event.previousIndex];
      const currentTasks = event.container.data;
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      this.taskService.transferTask(previousBoardId, currentBoardId, removedTask, currentTasks, this.pageId);
    }
  }

  openTaskDialog(task?: Task, index?: number) {
    const newTask = { id: this.taskService.generateTaskId(), label: 'purple' };
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '500px',
      data: { task: newTask, isNew: true},
      restoreFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.isNew) {
          this.taskService.updateTasks(this.pageId, this.board.id, [
            ...this.board.tasks,
            result.task
          ]);
        } 
      }
    });

  }

  handleDelete() {
    this.boardService.deleteBoard(this.board.id, this.pageId);
  }

}