import { Component, OnInit } from '@angular/core';
import { PlantasService } from '../../services/plantas.service';
import { Planta } from '../../models/Planta';
import { validateInputNoNumbers } from '../../utils/input-validation';
import Swal from 'sweetalert2';
import { Letalidad } from '../../models/Letalidad';

@Component({
  selector: 'app-plantas',
  templateUrl: './plantas.component.html',
  styleUrl: './plantas.component.css'
})
export class PlantasComponent implements OnInit {

  nuevaPlanta!: Planta;
  listaPlantas: Planta[] = [];

  //Declaración de datos obtenidor del PlantaService
  tiposDeClima: string[] = [];
  tiposDeHabitat: string[] = [];
  tiposDePlanta: string[] = [];
  tiposDeFertilizante: string[] = [];
  distribucionesGeograficasMexico: string[] = [];
  letalidad: Letalidad[] = [];

  //Validar inputs de texto
  isValidNombreCientifico: boolean = true;
  isValidNombreComun: boolean = true;
  isValidColor: boolean = true;
  isValidDescripcion: boolean = true;

  constructor(private plantaService: PlantasService) { }

  ngOnInit(): void {
    //Obtener datos predeterminados de combobox
    this.tiposDeClima = this.plantaService.getTiposDeClima();
    this.tiposDeHabitat = this.plantaService.getTiposDeHabitat();
    this.tiposDePlanta = this.plantaService.getTiposDePlanta();
    this.tiposDeFertilizante = this.plantaService.getTiposDeFertilizante();
    this.distribucionesGeograficasMexico = this.plantaService.getDistribucionGeografica();
    this.letalidad = this.plantaService.getLetalidad();
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

    console.log(this.nuevaPlanta);

  }  

  createPlanta(): void {
    if(
      this.nuevaPlanta.nombreCientifico === '' &&
      this.nuevaPlanta.nombreComun === '' &&
      this.nuevaPlanta.color === '' &&
      this.nuevaPlanta.descripcion === ''
    ) {
      Swal.fire({
        icon: "error",
        title: "Llena todos los campos",
        text: "No has llenado los campos necesarios",
      });
    }
    else {      
      delete this.nuevaPlanta.id;
      this.plantaService.createPlanta(this.nuevaPlanta);
      this.nuevaPlanta = this.plantaService.getNuevaPlanta();

      Swal.fire({
        title: "Registro exitoso",
        text: "El registro se realizó con éxito",
        icon: "success"
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

        this.plantaService.updatePlanta(this.nuevaPlanta);
        this.nuevaPlanta = this.plantaService.getNuevaPlanta();

        Swal.fire({
          title: "!Actualizado!",
          text: "Los campos han sido actualizados",
          icon: "success"
        });
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
    this.nuevaPlanta = {...planta};
  }

  limpiarInputsDeSeleccion(): void {
    this.nuevaPlanta = this.plantaService.getNuevaPlanta();
  }

  test() {
    console.log(this.nuevaPlanta);
  }

  //Funciones para validar inputs de texto
  validarNombreCientifico(): void { this.isValidNombreCientifico = validateInputNoNumbers(this.nuevaPlanta.nombreCientifico); }
  validarNombreComun(): void { this.isValidNombreComun = validateInputNoNumbers(this.nuevaPlanta.nombreComun); }
  validarColor(): void { this.isValidColor = validateInputNoNumbers(this.nuevaPlanta.color); }
  validarDescripcion(): void { this.isValidDescripcion = validateInputNoNumbers(this.nuevaPlanta.descripcion); }
}
