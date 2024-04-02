import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Gerente } from '../../models/Gerente';

@Component({
  selector: 'app-lista-gerentes',
  templateUrl: './lista-gerentes.component.html',
  styleUrl: './lista-gerentes.component.css'
})
export class ListaGerentesComponent {
  @Input() gerentes!: Gerente[];
  @Output() gerenteSeleccionado: EventEmitter<Gerente> = new EventEmitter<Gerente>;

  seleccionarGerente(gerente: Gerente) {
    this.gerenteSeleccionado.emit(gerente);
  }
}
