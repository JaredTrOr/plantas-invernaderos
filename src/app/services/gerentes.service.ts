import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Gerente } from '../models/Gerente';
import { DobleSeleccion } from '../models/DobleSeleccion';

@Injectable({
  providedIn: 'root'
})
export class GerentesService {

  private administrativo: DobleSeleccion[] = [];

  constructor(private firestore: AngularFirestore) {
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
    this.firestore.doc(`gerentes/${gerenteId}`).delete();
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
