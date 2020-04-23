import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task, Board } from '../page.model';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';
import { TaskService } from '../kanban-services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input() task: Task;
  @Input() index: number;
  @Input() board: Board;
  @Input() pageId: string;
  checked = false;

  constructor(private dialog: MatDialog, private taskService: TaskService) { }

  ngOnInit() {
  }

  openTaskDialog(task?: Task, index?: number) {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '500px',
      data: { task: { ...task }, isNew: false,  boardId: this.board.id, index }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (!result.isNew) {
          const update = this.board.tasks;
          update.splice(result.index, 1, result.task);
          this.taskService.updateTasks(this.pageId, this.board.id, this.board.tasks);
      }
    }});
  }

  checkTask(task: Task) {
    if (!this.checked) {
      if (task.type === 'task' || task.type === 'event') {
        task.color = 'green';
      } else {
        task.color = 'gray-noted';
      }
      task.type = 'checked';
      task.important = false;
      this.checked = true;
    }
  }

}
