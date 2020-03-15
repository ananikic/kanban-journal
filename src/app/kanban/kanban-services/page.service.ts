import { BoardService } from './board.service';
import { Board, Page } from '../page.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore, private boardServie: BoardService) { }

  /**
   * This method creates a page for the current user. If a title is provided, it creates a page with that title.
   * If the title is not provided but some of the premade template options is selected, it takes that options template name as a title,
   * and creates additional boards depending on the selected premade template.
   * If niether title is provided, nor a premade template option is select, the page is created without a title and without boards.
   * @param pageTitle - Optional title for the page or a premade template name if such is selected.
   * @returns Promise to a reference to the created page
   */
  createPage(isPremade: boolean, pageTitle?: string) {
    const user = this.afAuth.auth.currentUser;
    if (isPremade) {
     this.boardServie.createPremadeBoards(pageTitle);
    }
    return this.db.collection('pages').add({
      title: pageTitle,
      uid: user.uid,
      boards: this.boardServie.getPremadeBoards()
    });
  }

  /**
   * This method returns user page by the page id.
   * @param pageId - the id of the page
   * @returns Observable of the found page
   */
  findUserPageById(pageId: string) {
    const uid = this.afAuth.auth.currentUser.uid;
    return this.db.collection<Page>("pages", ref =>
         ref.where('uid', '==', uid)).doc(pageId).get();
  }
}
