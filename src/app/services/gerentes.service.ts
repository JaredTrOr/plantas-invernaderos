import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Gerente } from '../models/Gerente';
import { DobleSeleccion } from '../models/DobleSeleccion';
import { Invernadero } from '../models/Invernadero';
import { InvernaderosService } from './invernaderos.service';

@Injectable({
  providedIn: 'root'
})
export class GerentesService {

  private administrativo: DobleSeleccion[] = [];

  constructor(private firestore: AngularFirestore, private invernaderoService: InvernaderosService) {
    this.administrativo = [
      {
        texto: 'Administrador',
        value: true
      },
      {
        texto: 'Gerente',
        value: false
      }
    ]
  }

  getGerentes() {
    return this.firestore.collection('gerentes').snapshotChanges();
  }

  createGerente(gerente: Gerente) {
    return this.firestore.collection('gerentes').add(Object.assign({}, gerente));
  }

  updateGerente(gerente: Gerente) {
    this.firestore.doc(`gerentes/${gerente.id}`).update(gerente);
  }

  deleteGerente(gerenteId: string) {

    let invernaderos: Invernadero[] = [];

    this.firestore.doc(`gerentes/${gerenteId}`).delete();

    //Borrar gerente de la tabla de invernaderos
    this.invernaderoService.getInvernaderosPorIdGerente(gerenteId).subscribe(data => {
      invernaderos = data.map(doc => {
        return {
          ...doc.payload.doc.data() as Invernadero,
          id: doc.payload.doc.id
        };
      });

      const nuevosInvernaderos = invernaderos.map(invernadero => {
        for (let id of invernadero.gerentes) {
          if (id === gerenteId) {
            let indexToRemove = invernadero.gerentes.indexOf(id);
            invernadero.gerentes.splice(indexToRemove, 1);
          }
        }

        return invernadero;
      });

      for (let invernadero of nuevosInvernaderos) {
        this.invernaderoService.updateInvernadero(invernadero);
      }
    });


  }

  getNuevoGerente(): Gerente {
    return {
      id: '',
      nombre: '',
      apellidos: '',
      edad: 20,
      telefono: '',
      direccion: '',
      email: '',
      password: '',
      administrativo: false
    }
  }

  getAdministrativo(): DobleSeleccion[] {
    return this.administrativo;
  }
}
