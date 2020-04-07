import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePageComponent } from './create-page.component';
import { MatDialog } from '@angular/material/dialog';
import { PageService } from 'src/app/kanban/kanban-services/page.service';
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('TODO Component: CreateComponent', () => {
  const matDialogSpy = jasmine.createSpyObj('dialog', ['open']);
  const pageServiceSpy = jasmine.createSpyObj('pageService', ['createPage']);
  const routerSpy = jasmine.createSpyObj('router', ['navigate']);
  let component: CreatePageComponent;
  let fixture: ComponentFixture<CreatePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreatePageComponent],
      providers: [{ provide: MatDialog, useValue: matDialogSpy },
      { provide: PageService, useValue: pageServiceSpy },
      { provide: Router, useValue: routerSpy }],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
