import { TestBed, inject } from '@angular/core/testing';

import { ThemeService } from './theme.service';
import { RendererFactory2 } from '@angular/core';


let themeService: ThemeService;
const rendererFactorySpy = jasmine.createSpyObj('rendederFactory', ['createRenderer']);

describe('Service: ThemeService', () => {
  beforeEach(() => TestBed.configureTestingModule({
      providers: [ThemeService,
        {
          provide: RendererFactory2,
          useValue: rendererFactorySpy
        }]
  }));

  beforeEach(inject([ThemeService],
    (service: ThemeService) => {
      themeService = service;
    }));

  it('should be created', () => {
    expect(themeService).toBeTruthy();
  });
});
