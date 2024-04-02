import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlantasComponent } from './pages/plantas/plantas.component';

const routes: Routes = [
  {
    path: 'plantas',
    component: PlantasComponent
  },
  {
    path: '**',
    redirectTo: 'plantas'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
