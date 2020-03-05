import { Page } from './../kanban/page.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  constructor(private db: AngularFirestore, private afAuth: AngularFireAuth) { }

  /**
   * Create a new page for the current user.
   */
  async createPage(data: Page) {
    const user = await this.afAuth.auth.currentUser;
    return this.db.collection('pages').add({
      ...data,
      uid: user.uid,
      boards: []
    });
  }
}
