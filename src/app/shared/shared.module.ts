import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ShellComponent } from './shell/shell.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CreateComponent } from './create/create.component';
import { PageDialogComponent } from './create/page-dialog/page-dialog.component';
import { MatRadioModule } from '@angular/material/radio';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { TemplateDialogComponent } from './create/page-dialog/template-dialog/template-dialog.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

const components = [ShellComponent];
const modules = [CommonModule,
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
  MatSnackBarModule,
  MatDialogModule,
  FormsModule,
  MatRadioModule,
  ScrollingModule,
  LayoutModule,
  PerfectScrollbarModule
];

@NgModule({
  declarations: [components, CreateComponent, PageDialogComponent, TemplateDialogComponent],
  imports: [modules],
  exports: [components, modules],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }],
  entryComponents: [PageDialogComponent, TemplateDialogComponent]
})
export class SharedModule { }
