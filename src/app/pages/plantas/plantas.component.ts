import { Component, OnInit } from '@angular/core';
import { PlantasService } from '../../services/plantas.service';
import { Planta } from '../../models/Planta';
import { validateInputNoNumbers, validateInputWithNumbers } from '../../utils/input-validation';
import { DobleSeleccion } from '../../models/DobleSeleccion';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-plantas',
  templateUrl: './plantas.component.html',
  styleUrl: './plantas.component.css'
})
export class PlantasComponent implements OnInit {

  nuevaPlanta!: Planta;
  listaPlantas: Planta[] = [];

  //Declaración de datos obtenidos del PlantaService
  tiposDeClima: string[] = [];
  tiposDeHabitat: string[] = [];
  tiposDePlanta: string[] = [];
  tiposDeFertilizante: string[] = [];
  distribucionesGeograficasMexico: string[] = [];
  letalidad: DobleSeleccion[] = [];

  //Validar inputs de texto
  isValidNombreCientifico: boolean = false;
  isValidNombreComun: boolean = false;
  isValidColor: boolean = false;
  isValidDescripcion: boolean = false;
  isValidCantidad: boolean = true;

  constructor(private plantaService: PlantasService) { }

  ngOnInit(): void {
    //Obtener datos predeterminados de combobox
    this.tiposDeClima = this.plantaService.getTiposDeClima();
    this.tiposDeHabitat = this.plantaService.getTiposDeHabitat();
    this.tiposDePlanta = this.plantaService.getTiposDePlanta();
    this.tiposDeFertilizante = this.plantaService.getTiposDeFertilizante();
    this.distribucionesGeograficasMexico = this.plantaService.getDistribucionGeografica();
    this.letalidad = this.plantaService.getLetalidad();

    //Obtener la nueva planta al inizializar el componente
    this.nuevaPlanta = this.plantaService.getNuevaPlanta();

    //Obtener las plantas del firebase
    this.plantaService.getPlantas().subscribe(data => {
      this.listaPlantas = data.map(doc => {
        return {
          ...doc.payload.doc.data() as Planta,
          id: doc.payload.doc.id
        };
      });
    });

  }  

  createPlanta(): void {
    if(this.validarInputs()) {
      delete this.nuevaPlanta.id;
      this.plantaService.createPlanta(this.nuevaPlanta);
      this.nuevaPlanta = this.plantaService.getNuevaPlanta();

      Swal.fire({
        title: "Registro exitoso",
        text: "El registro se realizó con éxito",
        icon: "success"
      });

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

  updatePlanta(): void {
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
          this.plantaService.updatePlanta(this.nuevaPlanta);
          this.nuevaPlanta = this.plantaService.getNuevaPlanta();

          Swal.fire({
            title: "!Actualizado!",
            text: "Los campos han sido actualizados",
            icon: "success"
          });

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

  deletePlanta(): void {
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
        
        this.plantaService.deletePlanta(this.nuevaPlanta.id!);
        this.nuevaPlanta = this.plantaService.getNuevaPlanta();

        Swal.fire({
          title: "!Eliminado!",
          text: "La planta ha sido eliminada",
          icon: "success"
        });

        this.resetearValidacionesFalse();
      }
    });
  }

  //Funciones de UI
  agregarInput(): void {
    this.nuevaPlanta.distribucionGeografica.push('Aguascalientes');
  }

  removerInput(): void {
    this.nuevaPlanta.distribucionGeografica.pop();
  }

  plantaSeleccionada(planta: Planta): void {
    this.resetearValidacionesTrue();
    this.nuevaPlanta = {...planta};
  }

  limpiarInputsDeSeleccion(): void {
    this.resetearValidacionesFalse();
    this.nuevaPlanta = this.plantaService.getNuevaPlanta();
  }

  test() {
    console.log(this.nuevaPlanta);
  }

  resetearValidacionesTrue(): void {
    this.isValidNombreCientifico = this.isValidNombreComun = this.isValidDescripcion = this.isValidColor = this.isValidCantidad = true;
  }
  resetearValidacionesFalse(): void {
    this.isValidNombreCientifico = this.isValidNombreComun = this.isValidDescripcion = this.isValidColor = false;
  }

  //Funciones para validar inputs de texto
  validarNombreCientifico(): void { this.isValidNombreCientifico = validateInputNoNumbers(this.nuevaPlanta.nombreCientifico); }
  validarNombreComun(): void { this.isValidNombreComun = validateInputNoNumbers(this.nuevaPlanta.nombreComun); }
  validarColor(): void { this.isValidColor = validateInputNoNumbers(this.nuevaPlanta.color); }
  validarDescripcion(): void { this.isValidDescripcion = validateInputNoNumbers(this.nuevaPlanta.descripcion); }
  validarCantidad(): void { 
    if (this.nuevaPlanta.cantidad <= 0) this.isValidCantidad = false;
    else this.isValidCantidad = validateInputWithNumbers(String(this.nuevaPlanta.cantidad));
  }

  validarInputs(): boolean {
    return (
      this.isValidNombreCientifico &&
      this.isValidNombreComun &&
      this.isValidColor &&
      this.isValidDescripcion &&
      this.isValidCantidad
    );
  }
}
