import { TestBed, inject } from '@angular/core/testing';

import { SnackService } from './snack.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

let snackService: SnackService;
const snackBarSpy = jasmine.createSpy('snackBar');
const routerSpy = jasmine.createSpy('router');

describe('Service: SnackService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [SnackService,
      {
        provide: MatSnackBar,
        useValue: snackBarSpy
      },
      {
        provide: Router,
        useValue: routerSpy
      }]
  }));
  beforeEach(inject([SnackService],
    (service: SnackService) => {
      snackService = service;
    }));

  it('should be created', () => {
    expect(snackService).toBeTruthy();
  });
});
