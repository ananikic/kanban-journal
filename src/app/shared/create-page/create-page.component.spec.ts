import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePageComponent } from './create-page.component';
import { MatDialog } from '@angular/material/dialog';
import { PageService } from 'src/app/kanban/kanban-services/page.service';
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('Component: CreateComponent', () => {
  let matDialogSpy = jasmine.createSpyObj('dialog', ['open']);
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

  it('should open dialog on button click', () => {
    let buttonDe  = fixture.debugElement.query(By.css('.create'));
    let buttonEl = buttonDe.nativeElement;
    buttonEl.click();
    expect(matDialogSpy.open.calls.count()).toBe(1, 'spy method called once');
  });

});
