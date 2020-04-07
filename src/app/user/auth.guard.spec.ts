import { TestBed, inject } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { AngularFireAuth } from '@angular/fire/auth';
import { SnackService } from '../services/snack.service';

describe('AuthGuard', () => {
  const afAuthSpy = jasmine.createSpyObj('afAuth', ['authState']);
  const snackServiceSpy = jasmine.createSpyObj('snack', ['authError']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard, 
        {provide: AngularFireAuth, useValue: afAuthSpy},
        {provide: SnackService, useValue: snackServiceSpy}]
    });
  });

  it('should create AuthGuard', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
