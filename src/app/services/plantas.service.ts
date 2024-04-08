import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Planta } from '../models/Planta';
import { DobleSeleccion } from '../models/DobleSeleccion';
import { InvernaderosService } from './invernaderos.service';
import { Invernadero } from '../models/Invernadero';

@Injectable({
  providedIn: 'root'
})
export class PlantasService {

  private tiposDeHabitat: string[] = [];
  private tiposDeClima: string[] = [];
  private tiposDePlanta: string[] = [];
  private distribucionGeografica: string[] = [];
  private tiposDeFertilizantes: string[] = [];
  private letalidad: DobleSeleccion[] = [];

  constructor(private firestore: AngularFirestore, private invernaderoService: InvernaderosService) {
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
    let invernaderos: Invernadero[] = [];

    this.firestore.doc(`plantas/${plantaId}`).delete();

    //Borrar planta de la tabla de invernaderos
    this.invernaderoService.getInvernaderosPorIdPlanta(plantaId).subscribe(data => {
      invernaderos = data.map(doc => {
        return {
          ...doc.payload.doc.data() as Invernadero,
          id: doc.payload.doc.id
        };
      });

      const nuevosInvernaderos = invernaderos.map(invernadero => {
        for (let id of invernadero.plantas) {
          if (id === plantaId) {
            let indexToRemove = invernadero.plantas.indexOf(id);
            invernadero.plantas.splice(indexToRemove, 1);
          }
        }

        return invernadero;
      });

      for (let invernadero of nuevosInvernaderos) {
        this.invernaderoService.updateInvernadero(invernadero);
      }
    });
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

  getLetalidad(): DobleSeleccion[] {
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
