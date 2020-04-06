import { TestBed, inject } from '@angular/core/testing';

import { BoardService } from './board.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

let boardService: BoardService;
const afAuthSpy = jasmine.createSpy('afAuth');
const dbSpy = jasmine.createSpy('db');

describe('Service: BoardService', () => {
  beforeEach(() => TestBed.configureTestingModule({
      providers: [BoardService,
        {
          provide: AngularFireAuth,
          useValue: afAuthSpy
        },
        {
          provide: AngularFirestore,
          useValue: dbSpy
        }]
  }));
  
  beforeEach(inject([BoardService],
    (service: BoardService) => {
      boardService = service;
    }));


  it('should be created', () => {
    expect(boardService).toBeTruthy();
  });

});
