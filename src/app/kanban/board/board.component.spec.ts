import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardComponent } from './board.component';
import { BoardService } from '../kanban-services/board.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

xdescribe('Component: BoardComponent', () => {
  let boardServiceSpy = jasmine.createSpyObj('boardService', ['sortBoardTasks', 'transferTask']);
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardComponent ],
      providers: [ 
        {provide: BoardService, useValue: boardServiceSpy}],
        schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
