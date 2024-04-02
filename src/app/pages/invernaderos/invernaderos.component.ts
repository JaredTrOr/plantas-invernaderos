import { Component, OnInit } from '@angular/core';
import { InvernaderosService } from '../../services/invernaderos.service';
import { Invernadero } from '../../models/Invernadero';

@Component({
  selector: 'app-invernaderos',
  templateUrl: './invernaderos.component.html',
  styleUrl: './invernaderos.component.css'
})
export class InvernaderosComponent implements OnInit {

  nuevoInvernadero!: Invernadero;
  listaInvernaderos!: Invernadero[];

  //Validaciones
  isValidDireccion: boolean = false;
  isValidTelefono: boolean = false;

  constructor(private invernaderoService: InvernaderosService) { }

  ngOnInit(): void {

    //Obtener el objeto de invernadero al renderizar el componente
    this.nuevoInvernadero = this.invernaderoService.getNuevoInvernadero();

    this.invernaderoService.getInvernaderos().subscribe(data => {
      this.listaInvernaderos = data.map(doc => {
        return {
          ...doc.payload.doc.data() as Invernadero,
          id: doc.payload.doc.id
        };
      });
    });
  }

  createInvernadero(): void {

  }

  updateInvernadero(): void {

  }

  deleteInvernadero(): void {

  }

  invernaderoSeleccionado(invernadero: Invernadero): void {
    //Reset
    this.nuevoInvernadero = {...invernadero};
  }

  limpiarSeleccion(): void {
    //Reset
    this.nuevoInvernadero = this.invernaderoService.getNuevoInvernadero();
  }


}
