import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { PushEditComponent } from './push-edit/push-edit.component';

const routes: Routes = [
  // { path: '', redirectTo: 'login', pathMatch: 'full'},
  // { path: 'login', component: AppComponent },
  { path: 'push-edit', component: PushEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
