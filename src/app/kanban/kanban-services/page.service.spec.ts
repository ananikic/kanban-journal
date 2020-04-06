import { TestBed, inject } from '@angular/core/testing';

import { PageService } from './page.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { BoardService } from './board.service';


describe('Service: PageService', () => {
  let pageService: PageService;
  const afAuthSpy = jasmine.createSpy('afAuth');
  const dbSpy = jasmine.createSpy('db');
  const boardServiceSpy = jasmine.createSpy('boardService');

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PageService,
        {
          provide: AngularFireAuth,
          useValue: afAuthSpy
        },
        {
          provide: AngularFirestore,
          useValue: dbSpy
        },
        {
          provide: BoardService,
          useValue: boardServiceSpy
        }]
    });
  });
  beforeEach(inject([PageService],
    (service: PageService) => {
      pageService = service;
    }));

  it('should be created', () => {
    expect(pageService).toBeTruthy();
  });

});
