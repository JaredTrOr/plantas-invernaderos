import { Component, OnInit } from '@angular/core';
import { PlantasService } from '../../services/plantas.service';
import { Planta } from '../../models/Planta';

@Component({
  selector: 'app-plantas',
  templateUrl: './plantas.component.html',
  styleUrl: './plantas.component.css'
})
export class PlantasComponent implements OnInit {

  listaPlantas: Planta[] = [];

  constructor(private plantaService: PlantasService) { }

  ngOnInit(): void {
    this.plantaService.getPlantas().subscribe(data => {
      this.listaPlantas = data.map(doc => {
        return {
          ...doc.payload.doc.data() as Planta,
          id: doc.payload.doc.id
        };
      });
    });
  }

}
