import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../page.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input() task: Task;
  @Input() index: number;
  checked = false;

  constructor() { }

  ngOnInit() {
    console.log(this.task);
  }

  openTaskDialog(task: Task, index: number) {

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
