import { ThemeService } from './../../services/theme.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {

  isLight = false;
  isLightTheme: Observable<boolean>;

  constructor(private themeService: ThemeService) { }

  ngOnInit() {
    this.isLightTheme = this.themeService.isLightTheme;
  }

  toggleLightTheme() {
    this.themeService.setLightTheme(this.isLight);
  }

}
