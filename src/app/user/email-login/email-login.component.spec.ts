import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailLoginComponent } from './email-login.component';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('Component: EmailLoginComponent', () => {
  const fbSpy = jasmine.createSpyObj('fb',
    {
      ['group']:
      new FormGroup({
        email: new FormControl('test@gmail.com'),
        password: new FormControl('test123'),
        passwordConfirm: new FormControl('test123')
      })
    });
  const afAuthSpy = {
    auth: jasmine.createSpyObj('auth', ['signInWithEmailAndPassword', 'createUserWithEmailAndPassword', 'sendPasswordResetEmail'])
  };
  const routerSpy = jasmine.createSpyObj('router', ['navigate']);
  let component: EmailLoginComponent;
  let fixture: ComponentFixture<EmailLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EmailLoginComponent],
      providers: [{ provide: FormBuilder, useValue: fbSpy },
      { provide: AngularFireAuth, useValue: afAuthSpy },
      { provide: Router, useValue: routerSpy }],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain "Create Account"', () => {
    const bannerElement: HTMLElement = fixture.nativeElement;
    expect(bannerElement.textContent).toContain('Create Account');
  });

  it('should NOT contain "Sign In"', () => {
    const bannerElement: HTMLElement = fixture.nativeElement;
    expect(bannerElement.textContent).not.toContain('Sign in');
  });

});
