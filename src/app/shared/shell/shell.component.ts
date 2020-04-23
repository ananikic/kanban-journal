import { AngularFireAuth } from '@angular/fire/auth';
import { Component } from '@angular/core';
import { ThemeService } from './../../services/theme.service';
import { Router } from '@angular/router';

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

  constructor(public themeService: ThemeService, public afAuth: AngularFireAuth, public router: Router) { }

  setTheme(theme: string) {
    this.themeService.update(theme);
  }

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(['/'])
  }

}
