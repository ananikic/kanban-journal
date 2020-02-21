import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private renderer: Renderer2;
  private colorScheme: string;
  private colorSchemePrefix = 'color-scheme-';

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

 detectPrefersColorScheme() {
     if (window.matchMedia('(prefers-color-scheme)').media !== 'not all') {
         this.colorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } else {
        this.colorScheme = 'dark'; // default is dark
    }
}

 setColorScheme(scheme: string) {
  this.colorScheme = scheme;
  // Save prefers-color-scheme to localStorage
  localStorage.setItem('prefers-color', scheme);
}

getColorScheme() {
  // Check if any prefers-color-scheme is stored in localStorage
  if (localStorage.getItem('prefers-color')) {
      // Save prefers-color-scheme from localStorage
      this.colorScheme = localStorage.getItem('prefers-color');
  } else {
      // If no prefers-color-scheme is stored in localStorage, try to detect OS default prefers-color-scheme
      this.detectPrefersColorScheme();
  }
}

load() {
  this.getColorScheme();
  this.renderer.addClass(document.body, this.colorSchemePrefix + this.colorScheme);
}

update(scheme: string) {
  this.setColorScheme(scheme);
  // Remove the old color-scheme class
  this.renderer.removeClass( document.body, this.colorSchemePrefix + (this.colorScheme === 'dark' ? 'light' : 'dark') );
  // Add the new / current color-scheme class
  this.renderer.addClass(document.body, this.colorSchemePrefix + scheme);
}

currentActive(): string {
  return this.colorScheme;
}
}
