import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Planta } from '../models/Planta';
import { Letalidad } from '../models/Letalidad';

@Injectable({
  providedIn: 'root'
})
export class PlantasService {

  private tiposDeHabitat: string[] = [];
  private tiposDeClima: string[] = [];
  private tiposDePlanta: string[] = [];
  private distribucionGeografica: string[] = [];
  private tiposDeFertilizantes: string[] = [];
  private letalidad: Letalidad[] = [];

  constructor(private firestore: AngularFirestore) {
      this.tiposDeHabitat = [
      "Bosque",
      "Pradera",
      "Desierto",
      "Selva",
      "Montaña",
      "Humeda",
      ];

      this.tiposDeClima = [
      "Tropical",
      "Subtropical",
      "Templado",
      "Árido",
      "Continental",
      "Mediterráneo",
      ];

      this.tiposDePlanta = [
      "Hierba",
      "Arbusto",
      "Árbol",
      "Trepadora",
      "Planta acuática",
      "Musgo",
      "Flor"
      ];

      this.distribucionGeografica = [
      'Aguascalientes',
      'Baja California',
      'Baja California Sur',
      'Campeche',
      'Chiapas',
      'Chihuahua',
      'Coahuila de Zaragoza',
      'Colima',
      'Ciudad de México',
      'Durango',
      'Guanajuato',
      'Guerrero',
      'Hidalgo',
      'Jalisco',
      'Estado de Mexico',
      'Michoacan de Ocampo',
      'Morelos',
      'Nayarit',
      'Nuevo Leon',
      'Oaxaca',
      'Puebla',
      'Queretaro de Arteaga',
      'Quintana Roo',
      'San Luis Potosi',
      'Sinaloa',
      'Sonora',
      'Tabasco',
      'Tamaulipas',
      'Tlaxcala',
      'Veracruz de Ignacio de la Llave',
      'Yucatan',
      'Zacatecas',
      ];

      this.tiposDeFertilizantes = ['A1', 'A2', 'B1', 'B2', 'C1']
      this.letalidad = [
        {
          texto: 'Venenosa',
          value: true
        },
        {
          texto: 'No venenosa',
          value: false
        }
      ]
  }

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
    this.firestore.doc(`plantas/${plantaId}`).delete();
  }

  getTiposDeHabitat(): string[] {
    return this.tiposDeHabitat;
  }

  getTiposDeClima(): string[] {
    return this.tiposDeClima;
  }

  getTiposDePlanta(): string[] {
    return this.tiposDePlanta;
  }

  getDistribucionGeografica(): string[] {
    return this.distribucionGeografica;
  }

  getTiposDeFertilizante(): string[] {
    return this.tiposDeFertilizantes;
  }

  getLetalidad(): Letalidad[] {
    return this.letalidad;
  }

  getNuevaPlanta(): Planta {
    return {
      id: '',
      nombreCientifico: '',
      nombreComun: '',
      descripcion: '',
      habitat: 'Bosque',
      distribucionGeografica: ['Aguascalientes'],
      clima: 'Tropical',
      tipoPlanta: 'Hierba',
      tipoFertilizante: 'A1',
      color: '',
      venenosa: true,
      cantidad: 1
    }
  }
}
