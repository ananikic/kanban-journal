import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageDialogComponent } from './page-dialog.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('Component: PageDialogComponent', () => {
  let dialogRefSpy = jasmine.createSpyObj('dialogRef', ['close']);
  let templateDialogSpy = jasmine.createSpyObj('dialog', ['open']);
  let dataSpy = jasmine.createSpy('data');
  let component: PageDialogComponent;
  let fixture: ComponentFixture<PageDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageDialogComponent ],
      providers: [{ provide: MatDialog, useValue: templateDialogSpy },
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: dataSpy}],
        schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
