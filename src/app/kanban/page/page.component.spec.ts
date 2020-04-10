import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageComponent } from './page.component';
import { of } from 'rxjs';
import { PageService } from '../kanban-services/page.service';
import { BoardService } from '../kanban-services/board.service';
import { ActivatedRoute } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';

describe('Component: PageComponent', () => {
  let pageServiceSpy = jasmine.createSpyObj('pageService', ['sortBoards', 'findUserPageById']);
  let boardServiceSpy = jasmine.createSpyObj('boardService', ['findBoards']);
  let routeSpy = { paramMap: jasmine.createSpyObj('paramMap', { 'get': of({ id: '123' }), 'subscribe': null }) };
  const matDialogSpy = jasmine.createSpyObj('dialog', ['open']);
  let component: PageComponent;
  let fixture: ComponentFixture<PageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PageComponent],
      providers: [{ provide: PageService, useValue: pageServiceSpy },
      { provide: BoardService, useValue: boardServiceSpy },
      { provide: ActivatedRoute, useValue: routeSpy },
      { provide: MatDialog, useValue: matDialogSpy }],
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

  it('should open dialog on button click', () => {
    let buttonDe  = fixture.debugElement.query(By.css('.board-btn'));
    let buttonEl = buttonDe.nativeElement;
    buttonEl.click();
    expect(matDialogSpy.open.calls.count()).toBe(1, 'spy method called once');
  });

  
});
