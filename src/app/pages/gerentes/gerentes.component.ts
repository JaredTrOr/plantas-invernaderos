import { Component, OnInit } from '@angular/core';
import { Gerente } from '../../models/Gerente';
import { GerentesService } from '../../services/gerentes.service';
import { DobleSeleccion } from '../../models/DobleSeleccion';
import { onlyNumbers, validateEmail, validateInputNoNumbers } from '../../utils/input-validation';
import { validateInputWithNumbers } from '../../utils/input-validation';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gerentes',
  templateUrl: './gerentes.component.html',
  styleUrl: './gerentes.component.css'
})
export class GerentesComponent implements OnInit{

  nuevoGerente!: Gerente;
  administrativo: DobleSeleccion[] = [];
  listaGerentes: Gerente[] = [];

  //Validar inputs de texto
  isValidNombre: boolean = false;
  isValidApellidos: boolean = false;
  isValidEdad: boolean = true;
  isValidEmail: boolean = false;
  isValidPassword: boolean = false;
  isValidDireccion: boolean = false;
  isValidTelefono: boolean = false;

  constructor(private gerenteService: GerentesService) { }

  ngOnInit(): void {
    this.nuevoGerente = this.gerenteService.getNuevoGerente();
    this.administrativo = this.gerenteService.getAdministrativo();
    
    //Obtener las gerentes del firebase
    this.gerenteService.getGerentes().subscribe(data => {
      this.listaGerentes = data.map(doc => {
        return {
          ...doc.payload.doc.data() as Gerente,
          id: doc.payload.doc.id
        };
      });

      console.log(this.listaGerentes);
    });
  }

  createGerente(): void {
    if(this.validarInputs()) {
      delete this.nuevoGerente.id;
      this.gerenteService.createGerente(this.nuevoGerente);
      this.nuevoGerente = this.gerenteService.getNuevoGerente();

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

  updateGerente(): void {
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
          this.gerenteService.updateGerente(this.nuevoGerente);
          this.nuevoGerente = this.gerenteService.getNuevoGerente();

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

  deleteGerente(): void {
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
        this.gerenteService.deleteGerente(this.nuevoGerente.id!);        
        this.nuevoGerente = this.gerenteService.getNuevoGerente();

        Swal.fire({
          title: "!Eliminado!",
          text: "Gerente ha sido eliminado",
          icon: "success"
        });

        this.resetearValidacionesFalse();
      }
    });
  }

  gerenteSeleccionado(gerente: Gerente) {
    this.resetearValidacionesTrue();
    this.nuevoGerente = {...gerente};
  }

  limpiarInputsDeSeleccion(): void {
    this.resetearValidacionesFalse();
    this.nuevoGerente = this.gerenteService.getNuevoGerente();
  }

  //Funciones para validar inputs de texto
  validarNombre(): void { this.isValidNombre = validateInputNoNumbers(this.nuevoGerente.nombre); }
  validarApellidos(): void { this.isValidApellidos = validateInputNoNumbers(this.nuevoGerente.apellidos); }
  validarEmail(): void { this.isValidEmail = validateEmail(this.nuevoGerente.email); }
  validarPassword(): void { this.isValidPassword = validateInputWithNumbers(this.nuevoGerente.password); }
  validarDireccion(): void { this.isValidDireccion = validateInputWithNumbers(this.nuevoGerente.direccion); }
  validarTelefono(): void { this.isValidTelefono = onlyNumbers(this.nuevoGerente.telefono); }
  validarEdad(): void { 
    if (this.nuevoGerente.edad < 20) this.isValidEdad = false;
    else this.isValidEdad = validateInputWithNumbers(String(this.nuevoGerente.edad));
  }

  validarInputs(): boolean {
    return(
      this.isValidNombre &&
      this.isValidApellidos &&
      this.isValidEdad &&
      this.isValidEmail &&
      this.isValidPassword &&
      this.isValidDireccion &&
      this.isValidTelefono
    )
  }

  resetearValidacionesFalse(): void {
    this.isValidNombre = this.isValidApellidos = this.isValidEmail = this.isValidPassword = this.isValidDireccion = this.isValidTelefono = false;
  }

  resetearValidacionesTrue(): void {
    this.isValidNombre = this.isValidApellidos = this.isValidEmail = this.isValidPassword = this.isValidDireccion = this.isValidTelefono = this.isValidEdad = true;
  }

}
