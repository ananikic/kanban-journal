import { AngularFireAuth } from '@angular/fire/auth';
import { Component } from '@angular/core';
import { ThemeService } from './../../services/theme.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent {

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

  constructor(public themeService: ThemeService, public afAuth: AngularFireAuth) { }

  setTheme(theme: string) {
    this.themeService.update(theme);
  }

  logout() {
    this.afAuth.auth.signOut();
  }

}
