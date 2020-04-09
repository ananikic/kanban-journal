import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateDialogComponent } from './template-dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('Component: TemplateDialogComponent', () => {
  let dialogRefSpy = jasmine.createSpyObj('dialogRef', ['close']);
  let dataSpy = jasmine.createSpy('data');
  let component: TemplateDialogComponent;
  let fixture: ComponentFixture<TemplateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateDialogComponent ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: dataSpy}],
        schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
