import { Injectable } from '@angular/core';
import { Board, Page } from '../page.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { WEEK_BOARDS } from '../premade-boards';

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

  private createBoards(page: DocumentReference, premadeTemplate: Board[]) {
    const user = this.afAuth.auth.currentUser;
    const batch = this.db.firestore.batch();
    premadeTemplate.forEach((boardData) => {
      const id = this.db.createId();
      let board = this.db.collection('pages').doc(page.id).collection('boards').doc(id).ref;
      batch.set(board, {
        id: id,
        ...boardData,
        uid: user.uid,
        tasks: [{description: 'take my clothes from laundry', type: 'task', important: false}, 
          {description: 'work 8 hours today', type: 'note', color: 'pink', important: false}, 
          {description: 'swing class', type: 'event', color: 'blue', important: false}, 
          {description: 'pack my clothes', type: 'task', important: false}, 
          {description: 'catch a bus at 4pm', type: 'note', important: false}, 
          {description: 'BUY MY MOM A PRESENT', type: 'note', important: true}, 
          {description: 'workout', type: 'task', color: 'yellow', important: false}, 
          {description: 'start coursera course', type: 'task', color: 'pink', important: false}]
      })
    })
    batch.commit();
  }
}
