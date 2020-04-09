import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageComponent } from './page.component';
import { of } from 'rxjs';
import { PageService } from '../kanban-services/page.service';
import { BoardService } from '../kanban-services/board.service';
import { ActivatedRoute } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('Component: PageComponent', () => {
  let pageServiceSpy = jasmine.createSpyObj('pageService', ['sortBoards', 'findUserPageById']);
  let boardServiceSpy = jasmine.createSpyObj('boardService', ['findBoards']);
  let routeSpy = {paramMap: jasmine.createSpyObj('paramMap', {'get': of({id: '123'}), 'subscribe': null })};
  let component: PageComponent;
  let fixture: ComponentFixture<PageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageComponent ],
      providers: [{provide: PageService, useValue: pageServiceSpy}, 
        {provide: BoardService, useValue: boardServiceSpy},
        {provide: ActivatedRoute, useValue: routeSpy}],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
