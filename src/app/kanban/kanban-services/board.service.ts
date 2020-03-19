import { Injectable } from '@angular/core';
import { Board } from '../page.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { WEEK_BOARDS } from '../premade-boards';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  premadeBoards: Board[] = [];

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) { }

  public createPremadeBoards(template: string) {
    switch (template) {
      case 'week': this.premadeBoards = WEEK_BOARDS;
    }
  }

  public getPremadeBoards(): Board[] {
    return this.premadeBoards;
  }
}
