import { Component, OnInit } from '@angular/core';
import { InvernaderosService } from '../../services/invernaderos.service';
import { Invernadero } from '../../models/Invernadero';
import { PlantasService } from '../../services/plantas.service';
import { GerentesService } from '../../services/gerentes.service';
import { Planta } from '../../models/Planta';
import { Gerente } from '../../models/Gerente';
import { onlyNumbers, validateInputNoNumbers, validateInputWithNumbers } from '../../utils/input-validation';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-invernaderos',
  templateUrl: './invernaderos.component.html',
  styleUrl: './invernaderos.component.css'
})
export class InvernaderosComponent implements OnInit {

  nuevoInvernadero!: Invernadero;

  listaInvernaderos: Invernadero[] = [];
  listaPlantas: Planta[] = [];
  listaGerentes: Gerente[] = [];

  //Validaciones
  isValidNombre: boolean = false;
  isValidDireccion: boolean = false;
  isValidTelefono: boolean = false;

  //Guardar los ID's de plantas y gerentes
  idPlanta!: string;
  idGerente!: string;

  constructor(
    private invernaderoService: InvernaderosService, 
    private plantaService: PlantasService, 
    private gerenteService: GerentesService
  ) 
  { }

  ngOnInit(): void {
    //Obtener el objeto de invernadero al renderizar el componente
    this.nuevoInvernadero = this.invernaderoService.getNuevoInvernadero();

    //Carga de listas de los diferentes servicios
    this.invernaderoService.getInvernaderos().subscribe(data => {
      this.listaInvernaderos = data.map(doc => {
        return {
          ...doc.payload.doc.data() as Invernadero,
          id: doc.payload.doc.id
        };
      });
    });

    this.plantaService.getPlantas().subscribe(data => {
      this.listaPlantas = data.map(doc => {
        return {
          ...doc.payload.doc.data() as Planta,
          id: doc.payload.doc.id
        };
      });

      //Resetear arreglo para que no se apilen los ID's por el renderizado
      this.nuevoInvernadero.plantas = [];

      //Agregar el primer ID de la lista de palntas para que el input de selección 
      //coincida
      if (this.listaPlantas.length) {
        this.idPlanta = this.listaPlantas[0].id!;
        this.nuevoInvernadero.plantas.push(this.idPlanta);
      }
    });

    this.gerenteService.getGerentes().subscribe(data => {
      this.listaGerentes = data.map(doc => {
        return {
          ...doc.payload.doc.data() as Gerente,
          id: doc.payload.doc.id
        };
      });

      //Resetear arreglo para que no se apilen los ID's por el renderizado
      this.nuevoInvernadero.gerentes = [];

      //Agregar el primer ID de la lista de gerentes para que el input de selección 
      //coincida
      if (this.listaGerentes.length) {
        this.idGerente = this.listaGerentes[0].id!;
        this.nuevoInvernadero.gerentes.push(this.idGerente);
      }
    });

  }

  createInvernadero(): void {
    if (this.validarInputs()) {
      delete this.nuevoInvernadero.id;
      this.invernaderoService.createInvernadero(this.nuevoInvernadero);
      this.nuevoInvernadero = this.invernaderoService.getNuevoInvernadero();

      Swal.fire({
        title: "Registro exitoso",
        text: "El registro se realizó con éxito",
        icon: "success"
      });

      this.setPlantaInvernadero(this.idPlanta);
      this.setGerenteInvernadero(this.idGerente);
      this.resetearValidacionesFalse();
    }
    
    else {
      Swal.fire({
        icon: "error",
        title: "Llena todos los campos",
        text: "No has llenado los campos necesarios",
      });
    }
  }

  updateInvernadero(): void {
    Swal.fire({
      title: "¿Esta seguro que desea actualizar?",
      text: "No será posible revertir los cambios",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: 'Cancelar',
      confirmButtonText: "Si, actualizar"
    }).then((result) => {
      if (result.isConfirmed) {

        if(this.validarInputs()) {
          this.invernaderoService.updateInvernadero(this.nuevoInvernadero);
          this.nuevoInvernadero = this.invernaderoService.getNuevoInvernadero();

          Swal.fire({
            title: "!Actualizado!",
            text: "Los campos han sido actualizados",
            icon: "success"
          });

          this.setPlantaInvernadero(this.idPlanta);
          this.setGerenteInvernadero(this.idGerente);
          this.resetearValidacionesFalse();
        }

        else {
          Swal.fire({
            icon: "error",
            title: "Llena todos los campos",
            text: "No has llenado los campos necesarios",
          });
        }
      }
    });
  }

  deleteInvernadero(): void {
    Swal.fire({
      title: "¿Esta seguro que desea eliminar?",
      text: "No será posible revertir los cambios",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: 'Cancelar',
      confirmButtonText: "Si, eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        
        this.invernaderoService.deleteInvernadero(this.nuevoInvernadero.id!);
        this.nuevoInvernadero = this.invernaderoService.getNuevoInvernadero();

        Swal.fire({
          title: "!Eliminado!",
          text: "Invernadero eliminado",
          icon: "success"
        });

        this.setGerenteInvernadero(this.idGerente);
        this.setPlantaInvernadero(this.idPlanta);
        this.resetearValidacionesFalse();
      }
    });
  }

  //Funcionalidad de selección
  invernaderoSeleccionado(invernadero: Invernadero): void {
    this.resetearValidacionesTrue();
    this.nuevoInvernadero = {...invernadero};
  }

  limpiarSeleccion(): void {
    this.nuevoInvernadero = this.invernaderoService.getNuevoInvernadero();
    this.setPlantaInvernadero(this.idPlanta);
    this.setGerenteInvernadero(this.idGerente);
    this.resetearValidacionesFalse();
  }

  //Funcionalidad de UI
  agregarInputGerentes(): void {
    if (this.listaGerentes.length) {
      this.nuevoInvernadero.gerentes.push(this.listaGerentes[0].id!);
    }
  }

  removerInputGerentes(): void {
    this.nuevoInvernadero.gerentes.pop();
  }

  agregarInputPlantas(): void {
    if (this.listaPlantas.length) {
      this.nuevoInvernadero.plantas.push(this.listaPlantas[0].id!);
    }
  }

  removerInputPlantas(): void {
    this.nuevoInvernadero.plantas.pop();
  }

  //Agregar los ID's de selección en el arreglo de plantas y gerentes del invernadero
  setPlantaInvernadero(idPlanta: string): void {
    this.nuevoInvernadero.plantas = [];
    this.nuevoInvernadero.plantas.push(idPlanta);
  }

  setGerenteInvernadero(idGerente: string): void {
    this.nuevoInvernadero.gerentes = [];
    this.nuevoInvernadero.gerentes.push(idGerente);
  }

  //Validaciones de entrada
  validarNombre(): void { this.isValidNombre = validateInputNoNumbers(this.nuevoInvernadero.nombre); }
  validarDireccion(): void { this.isValidDireccion = validateInputWithNumbers(this.nuevoInvernadero.direccion); }
  validarTelefono(): void { this.isValidTelefono = onlyNumbers(this.nuevoInvernadero.telefono); }

  resetearValidacionesFalse(): void { 
    this.isValidNombre = this.isValidDireccion = this.isValidTelefono = false;
  }

  resetearValidacionesTrue(): void { 
    this.isValidNombre = this.isValidDireccion = this.isValidTelefono = true;
  }

  validarInputs(): boolean {
    return (
      this.isValidNombre &&
      this.isValidDireccion &&
      this.isValidTelefono
    )
  }

}
