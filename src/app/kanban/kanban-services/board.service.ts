import { Injectable } from '@angular/core';
import { Board, Page, Task } from '../page.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { WEEK_BOARDS } from '../premade-boards';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) { }

  public createPremadeBoards(template: string, page: DocumentReference) {
    switch (template) {
      case 'week': this.createBoards(page, WEEK_BOARDS);
    }
  }

  public findBoards(pageId: string) {
    const user = this.afAuth.auth.currentUser;
    return this.db.collection('pages').doc(pageId).collection<Board>('boards', ref =>
      ref.where('uid', '==', user.uid).orderBy('priority')).valueChanges();
  }

  public sortBoardTasks(tasks: Task[], pageId: string, boardId: string) {
    return this.db.collection('pages').doc(pageId).collection('boards').doc(boardId).update({ tasks });
  }

  public removeTask(boardId: string, pageId: string, task: Task) {
    return this.db.collection('pages').doc(pageId)
      .collection('boards').doc(boardId)
      .update({
        tasks: firebase.firestore.FieldValue.arrayRemove(task)
      });
  }

  public transferTask(previousBoardId: string, currentBoardId: string, task: Task, tasks: Task[], pageId: string) {
    const batch = this.db.firestore.batch();
    const prevBoardRef = this.db.collection('pages').doc(pageId)
    .collection('boards').doc(previousBoardId).ref;
    const currBoardRef = this.db.collection('pages').doc(pageId)
    .collection('boards').doc(currentBoardId).ref;
    batch.update(prevBoardRef, { tasks: firebase.firestore.FieldValue.arrayRemove(task) });
    batch.update(currBoardRef, { tasks });
    batch.commit();
  }

  private createBoards(page: DocumentReference, premadeTemplate: Board[]) {
    const user = this.afAuth.auth.currentUser;
    const batch = this.db.firestore.batch();
    premadeTemplate.forEach((boardData) => {
      const generatedId = this.db.createId();
      const board = this.db.collection('pages').doc(page.id).collection('boards').doc(generatedId).ref;
      batch.set(board, {
        id: generatedId,
        ...boardData,
        uid: user.uid,
        tasks: [{ description: 'take my clothes from laundry', type: 'task', important: false },
        { description: 'work 8 hours today', type: 'note', color: 'pink', important: false },
        { description: 'swing class', type: 'event', color: 'blue', important: false },
        { description: 'pack my clothes', type: 'task', important: false },
        { description: 'catch a bus at 4pm', type: 'note', important: false },
        { description: 'BUY MY MOM A PRESENT', type: 'note', important: true },
        { description: 'workout', type: 'task', color: 'yellow', important: false },
        { description: 'start coursera course', type: 'task', color: 'pink', important: false }]
      });
    });
    batch.commit();
  }
}
