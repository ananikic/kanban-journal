import { BoardService } from './board.service';
import { Board, Page } from '../page.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';

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
   * @param pageTitle - title for the page. The default is empty string.
   * @param selectedTemplate - premade template name if such is selected, the default is empty string.
   * @returns Promise to a reference to the created page
   */
  async createPage(isPremade: boolean, pageTitle: string = '', selectedTemplate: string = '') {
    const user = await this.afAuth.auth.currentUser;
    if (isPremade) {
      this.boardServie.createPremadeBoards(selectedTemplate);
    }
    if (!pageTitle) {
      pageTitle = selectedTemplate;
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
