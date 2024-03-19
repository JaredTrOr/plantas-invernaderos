import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Planta } from '../models/Planta';

@Injectable({
  providedIn: 'root'
})
export class PlantasService {

  constructor(private firestore: AngularFirestore) { }

  getPlantas() {
    return this.firestore.collection('plantas').snapshotChanges();
  }

  createPlanta(planta: Planta) {
    return this.firestore.collection('plantas').add(Object.assign({}, planta));
  }

  updatePlanta(planta: Planta) {
    this.firestore.doc(`plantas/${planta.id}`).update(planta);
  }

  deletePlanta(plantaId: string) {
    this.firestore.doc(`computadoras/${plantaId}`).delete();
  }
}
