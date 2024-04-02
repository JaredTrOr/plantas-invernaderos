import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlantasComponent } from './pages/plantas/plantas.component';
import { GerentesComponent } from './pages/gerentes/gerentes.component';
import { InvernaderosComponent } from './pages/invernaderos/invernaderos.component';

const routes: Routes = [
  {
    path: 'plantas',
    component: PlantasComponent
  },
  { 
    path: 'gerentes',
    component: GerentesComponent
  },
  {
    path: 'invernaderos',
    component: InvernaderosComponent
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
