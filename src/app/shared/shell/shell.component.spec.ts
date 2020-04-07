import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShellComponent } from './shell.component';
import { of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { ThemeService } from 'src/app/services/theme.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';

describe('TODO Component: ShellComponent', () => {
  const themeServiceSpy = jasmine.createSpyObj('theme', ['currentActive']);
  const afAuthSpy = {
    auth: of({uid:'123456'})
  };
  let component: ShellComponent;
  let fixture: ComponentFixture<ShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatMenuModule],
      declarations: [ ShellComponent ],
      providers: [{provide: AngularFireAuth, useValue: afAuthSpy}, 
        {provide: ThemeService, useValue: themeServiceSpy}],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
