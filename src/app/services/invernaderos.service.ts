import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Invernadero } from '../models/Invernadero';

@Injectable({
  providedIn: 'root'
})
export class InvernaderosService {

  private nuevoInvernadero: Invernadero = {
    id: '',
    nombre: '',
    direccion: '',
    telefono: '',
    plantas: [],
    gerentes: []
  }

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

  setPlantasInvernadero(idPlanta: string): void {
    this.nuevoInvernadero.plantas.push(idPlanta);
  }

  setGerentesInvernadero(idGerente: string): void {
    this.nuevoInvernadero.gerentes.push(idGerente);
  }

  getNuevoInvernadero(): Invernadero { return this.nuevoInvernadero }
}
