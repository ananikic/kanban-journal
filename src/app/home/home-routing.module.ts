import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { HomeGroupComponent } from './home-group/home-group.component';


const routes: Routes = [
  { path: '', component: HomePageComponent},
  { path: '', component: HomeGroupComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
