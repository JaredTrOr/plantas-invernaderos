import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Planta } from '../../models/Planta';

@Component({
  selector: 'app-lista-plantas',
  templateUrl: './lista-plantas.component.html',
  styleUrl: './lista-plantas.component.css'
})
export class ListaPlantasComponent {
  @Input() plantas! : Planta[];
  @Output() plantaSeleccionada: EventEmitter<Planta> = new EventEmitter<Planta>();

  constructor() { }

  seleccionarPlanta(planta: Planta) {
    this.plantaSeleccionada.emit(planta);
  }
}
