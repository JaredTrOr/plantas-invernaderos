import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Firebase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment.development';

//Components
import { PlantasComponent } from './pages/plantas/plantas.component';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { ListaPlantasComponent } from './pages/lista-plantas/lista-plantas.component';
import { GerentesComponent } from './pages/gerentes/gerentes.component';
import { ListaGerentesComponent } from './pages/lista-gerentes/lista-gerentes.component';
import { InvernaderosComponent } from './pages/invernaderos/invernaderos.component';
import { ListaInvernaderosComponent } from './pages/lista-invernaderos/lista-invernaderos.component';

@NgModule({
  declarations: [
    AppComponent,
    PlantasComponent,
    SidebarComponent,
    ListaPlantasComponent,
    GerentesComponent,
    ListaGerentesComponent,
    InvernaderosComponent,
    ListaInvernaderosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
