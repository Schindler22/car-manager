import { Component } from '@angular/core';
import { Car, CarService } from '../car.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Brand {
  id: number;
  marca: string
}

@Component({
  selector: 'app-new-car',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule ],
  templateUrl: './new-car.component.html',
  styleUrl: './new-car.component.css'
})

export class NewCarComponent {
    car: Car = { ano: '', chassi: '', marca: '', modelo: '', placa: '', renavam: ''} 

    
    marcas: Brand[] = [];
    modelos: string[] = [];

    constructor(private carService: CarService, private router: Router) {}  

    ngOnInit() {
        this.loadBrands();
    }
    
    loadBrands() {
        this.carService.getBrands().subscribe(data => {
          data.forEach((item: any) => {
            this.marcas.push(item.marca)
          });
        });
    }

    onMarcaChange() {
        this.carService.getModels(this.car.marca).subscribe(data => {
          data.forEach((item: any) => {
            this.marcas.push(item.marca)
          });
          this.modelos = data;
          this.car.modelo = '';
        });
    }

    newCar = (car: Car) => {
      const missingFields = this.validateCar(car);
      if (missingFields.length > 0) {
          alert(`Por favor, preencha os seguintes campos: ${missingFields.join(', ')}`);
          return;
      }
      this.carService.newCar(car).subscribe(data => {
        alert(data);
        this.car = {ano: '', chassi: '', marca: '', modelo: '', placa: '', renavam: ''}
      });
    }   

    validateCar(car: Car): string[] {
      const missingFields: string[] = [];   
      for (const [key, value] of Object.entries(car)) {
        if (typeof value === 'string' && value.trim() === '') {
          missingFields.push(key);
        } else if (typeof value === 'number' && value === 0) {
          missingFields.push(key);
        }
      } 
      return missingFields;
    }
}
