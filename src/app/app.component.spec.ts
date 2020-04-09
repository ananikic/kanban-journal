import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ThemeService } from './services/theme.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('Component: AppComponent', () => {
  const themeServiceSpy = jasmine.createSpyObj('theme', ['load']);
  let appComponent: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [{ provide: ThemeService, useValue: themeServiceSpy }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    appComponent = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create the app component', () => {
    expect(appComponent).toBeTruthy();
  });

  it(`should have a title 'kanban-journal'`, () => {
    expect(appComponent.title).toEqual('kanban-journal');
  });

});
