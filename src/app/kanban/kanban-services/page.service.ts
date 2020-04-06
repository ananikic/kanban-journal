import { BoardService } from './board.service';
import { Board, Page } from '../page.model';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
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
   * @param isPremade - tells if the page has premade template
   * @param pageTitle - title for the page. The default is empty string.
   * @param selectedTemplate - premade template name if such is selected, the default is empty string.
   * @returns Promise to a reference to the created page
   */
  public async createPage(isPremade: boolean, pageTitle: string = '', selectedTemplate: string = '') {
    const user = this.afAuth.auth.currentUser;
    if (!pageTitle) {
      pageTitle = selectedTemplate;
    }
    const page = await this.db.collection('pages').add({
      title: pageTitle,
      uid: user.uid
    });
    if (isPremade) {
      this.boardServie.createPremadeBoards(selectedTemplate, page);
    }
    return page;
  }

  /**
   * This method returns user page by the page id.
   * @param pageId - the id of the page
   * @returns Observable of the found page
   */
  public findUserPageById(pageId: string) {
    const uid = this.afAuth.auth.currentUser.uid;
    return this.db.collection<Page>('pages', ref =>
      ref.where('uid', '==', uid)).doc(pageId).get();
  }

  /**
   * This method sorts the boards in the page when user drags and drops some board. 
   * @param boards - all of the boards in the page
   * @param pageId - the id of the page
   */
  public sortBoards(boards: Board[], pageId: string) {
    const batch = this.db.firestore.batch();
    const refs = boards.map(b => this.db.firestore.collection('pages').doc(pageId).collection('boards').doc(b.id));
    refs.forEach((ref, idx) => batch.update(ref, { priority: idx }));
    batch.commit();
  }
}
