import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KanbanRoutingModule } from './kanban-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogModule } from '@angular/material/dialog';
import { PageComponent } from './page/page.component';
import { BoardComponent } from './board/board.component';
import { TaskComponent } from './task/task.component';
import { BoardDialogComponent } from './page/board-dialog/board-dialog.component';


@NgModule({
  declarations: [PageComponent, BoardComponent, TaskComponent, BoardDialogComponent],
  imports: [
    CommonModule,
    KanbanRoutingModule,
    SharedModule,
    FormsModule,
    DragDropModule,
    MatDialogModule
  ],
  entryComponents: [BoardDialogComponent]
})
export class KanbanModule { }
