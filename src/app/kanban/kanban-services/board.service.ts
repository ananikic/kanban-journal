import { Injectable } from '@angular/core';
import { Board, Page, Task } from '../page.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { WEEK_BOARDS } from '../premade-boards';
import * as firebase from 'firebase';
import { Subscription, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) { }

  /**
   * Adds boards to a page which will be premade. Should be called only if the page premade option is true.
   * @param template - name of the premade template, depending on which different boards are added
   * @param page - reference to the page where boards will be added
   */
  public createPremadeBoards(template: string, page: DocumentReference) {
    switch (template) {
      case 'week': this.createBoards(page, WEEK_BOARDS);
    }
  }

  /**
   * Creates board on a page.
   * @param data - data obtained from the board dialog
   * @param pageId - id of the page
   */
  public createBoard(data: Board, pageId: string) {
    const user = this.afAuth.auth.currentUser;
    const generatedId = this.db.createId();
    const board = this.db.collection('pages').doc(pageId).collection('boards').doc(generatedId).ref;
    board.set({
      id: generatedId,
      ...data,
      uid: user.uid,
      tasks: []});
  }

/**
 * Finds user boards by provided page id.
 * @param pageId - the id of the page
 * @returns Observable of Boards array
 */
  public findBoards(pageId: string): Observable<Board[]> {
    const user = this.afAuth.auth.currentUser;
    return this.db.collection('pages').doc(pageId).collection<Board>('boards', ref =>
      ref.where('uid', '==', user.uid).orderBy('priority')).valueChanges();
  }

  public deleteBoard(boardId: string, pageId: string) {
    const user = this.afAuth.auth.currentUser;
    return this.db.collection('pages').doc(pageId).collection<Board>('boards', ref =>
      ref.where('uid', '==', user.uid)).doc(boardId).delete();
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
