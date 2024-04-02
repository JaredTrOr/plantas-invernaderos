import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaInvernaderosComponent } from './lista-invernaderos.component';

describe('ListaInvernaderosComponent', () => {
  let component: ListaInvernaderosComponent;
  let fixture: ComponentFixture<ListaInvernaderosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaInvernaderosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaInvernaderosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
