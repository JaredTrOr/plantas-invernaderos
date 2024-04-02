import { Component, OnInit } from '@angular/core';
import { Gerente } from '../../models/Gerente';
import { GerentesService } from '../../services/gerentes.service';
import { DobleSeleccion } from '../../models/DobleSeleccion';

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

  agregarGerente(): void {
    this.gerenteService.createGerente(this.nuevoGerente);
  }

  updateGerente(): void {
    this.gerenteService.updateGerente(this.nuevoGerente);
  }

  deleteGerente(): void {
    this.gerenteService.deleteGerente(this.nuevoGerente.id!);
  }

  gerenteSeleccionado(gerente: Gerente) {
    this.nuevoGerente = {...gerente};
  }

}
