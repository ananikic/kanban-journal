import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Task } from '../page.model';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) { }

  public generateTaskId() {
    return this.db.createId();
  }
  
  /**
   * Updates the tasks on board.
   */
  public updateTasks(pageId: string, boardId: string, tasks: Task[]) {
    return this.db.collection('pages').doc(pageId)
      .collection('boards')
      .doc(boardId)
      .update({ tasks });
  }

  /**
   * Sorts tasks in one board. Should be called only when task is dragged and dropped in the same board.
   * @param tasks - whole tasks array of the board
   * @param pageId - id of the page where the board is
   * @param boardId - id of the board where the tasks are
   */
  public sortBoardTasks(tasks: Task[], pageId: string, boardId: string) {
    return this.db.collection('pages').doc(pageId)
    .collection('boards').doc(boardId).update({ tasks });
  }

  /**
   * Removes a task from a board.
   * @param boardId - id of the board
   * @param pageId - id of the page
   * @param task - task to be removed
   */
  public removeTask(boardId: string, pageId: string, task: Task) {
    return this.db.collection('pages').doc(pageId)
      .collection('boards').doc(boardId)
      .update({
        tasks: firebase.firestore.FieldValue.arrayRemove(task)
      });
  }

  /**
   * Sorts the tasks between boards. Should be called when the task is dragged and dropped between different boards.
   * @param previousBoardId - id of the board from which the task is taken
   * @param currentBoardId - id of the board to which the task is dropped
   * @param task - dragged and dropped task
   * @param currentTasks - whole tasks array where the task is dropped
   * @param pageId - id of the page
   */
  public transferTask(previousBoardId: string, currentBoardId: string, task: Task, currentTasks: Task[], pageId: string) {
    const batch = this.db.firestore.batch();
    const prevBoardRef = this.db.collection('pages').doc(pageId)
    .collection('boards').doc(previousBoardId).ref;
    const currBoardRef = this.db.collection('pages').doc(pageId)
    .collection('boards').doc(currentBoardId).ref;
    batch.update(prevBoardRef, { tasks: firebase.firestore.FieldValue.arrayRemove(task) });
    batch.update(currBoardRef, { tasks: currentTasks });
    batch.commit();
  }

}
