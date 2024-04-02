import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Invernadero } from '../models/Invernadero';

@Injectable({
  providedIn: 'root'
})
export class InvernaderosService {

  constructor(private firestore: AngularFirestore) { }

  getInvernaderos() {
    return this.firestore.collection('invernaderos').snapshotChanges();
  }

  createInvernadero(invernadero: Invernadero) {
    return this.firestore.collection('invernaderos').add(Object.assign({}, invernadero));
  }

  updateInvernadero(invernadero: Invernadero) {
    this.firestore.doc(`invernaderos/${invernadero.id}`).update(invernadero);
  }

  deleteInvernadero(invernaderoId: string) {
    this.firestore.doc(`invernaderos/${invernaderoId}`).delete();
  }

  getNuevoInvernadero(): Invernadero {
    return {
      id: '',
      direccion: '',
      telefono: '',
      plantas: [],
      gerentes: []
    }
  }
}
