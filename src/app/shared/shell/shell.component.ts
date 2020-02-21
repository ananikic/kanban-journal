import { ThemeService } from './../../services/theme.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent {

  isLight: boolean;
  public themes = [
    {
        name: 'light',
        icon: '🌖',
        title: 'let there be light'
    },
    {
        name: 'dark',
        icon: '🌘',
        title: 'come to the dark side'
    }
];

  constructor(private themeService: ThemeService) { }

  setTheme(theme: string) {
    this.themeService.update(theme);
 }

}
