import { AuthGuard } from './user/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./home/home.module').then( m => m.HomeModule) },
  { path: 'login', loadChildren: () => import('./user/user.module').then( m => m.UserModule) },
  { path: 'page', loadChildren: () => import('./kanban/kanban.module').then( m => m.KanbanModule ),
  canActivate: [AuthGuard] }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
