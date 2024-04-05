import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Invernadero } from '../../models/Invernadero';
import { Planta } from '../../models/Planta';
import { Gerente } from '../../models/Gerente';

@Component({
  selector: 'app-lista-invernaderos',
  templateUrl: './lista-invernaderos.component.html',
  styleUrl: './lista-invernaderos.component.css'
})
export class ListaInvernaderosComponent {
  @Input() invernaderos!: Invernadero[];
  @Input() plantas!: Planta[];
  @Input() gerentes!: Gerente[];

  @Output() invernaderoSeleccionado: EventEmitter<Invernadero> = new EventEmitter<Invernadero>;

  seleccionarInvernadero(invernadero: Invernadero) {
    this.invernaderoSeleccionado.emit(invernadero);
  }

  obtenerNombreGerentes(idGerente: string): string {
    let nombreGerente: string = '';

    for(let gerente of this.gerentes)
      if (gerente.id === idGerente) nombreGerente += gerente.nombre + gerente.apellidos;
      
    return nombreGerente;
  } 

  obtenerNombrePlantaCantidad(idPlanta: string): string {
    let nombrePlantaCantidad: string = '';

    for(let planta of this.plantas)
      if(planta.id === idPlanta) 
        nombrePlantaCantidad += planta.nombreComun + '/' + planta.cantidad;

    return nombrePlantaCantidad
  }
  

}
