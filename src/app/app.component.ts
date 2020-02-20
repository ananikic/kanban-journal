import { Observable } from 'rxjs';
import { ThemeService } from './services/theme.service';
import { Component, OnInit, OnChanges, DoCheck } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'kanban-journal';
  isLightTheme: Observable<boolean>;
  isLightThemeOld: Observable<boolean>;

  constructor(private themeService: ThemeService, private overlayContainer: OverlayContainer) { }

  ngOnInit(): void {
    this.isLightTheme = this.themeService.isLightTheme;
    this.isLightTheme.subscribe( isLight => {
      if (isLight) {
        this.overlayContainer.getContainerElement().classList.add('light-theme');
      } else if (!isLight) {
        this.overlayContainer.getContainerElement().classList.add('kanban-journal-theme');
      }
  });
  }
}
