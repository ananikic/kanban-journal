import { Observable } from 'rxjs';
import { ThemeService } from './services/theme.service';
import { Component, OnInit, OnChanges, DoCheck } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'kanban-journal';

  constructor(private themeService: ThemeService, private overlayContainer: OverlayContainer) {
    this.themeService.load();
  }

}
