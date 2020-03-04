import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ShellComponent } from './shell/shell.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const components = [ShellComponent];
const modules = [ CommonModule,
  RouterModule,
  MatToolbarModule,
  MatMenuModule,
  MatIconModule,
  MatButtonModule,
  MatSidenavModule,
  MatButtonToggleModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatSnackBarModule
];

@NgModule({
  declarations: [components],
  imports: [modules],
  exports: [components, modules]
})
export class SharedModule { }
