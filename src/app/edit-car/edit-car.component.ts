import { Component } from '@angular/core';
import { Car, CarService } from '../car.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Brand } from '../new-car/new-car.component';

@Component({
  selector: 'app-edit-car',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule ],
  templateUrl: './edit-car.component.html',
  styleUrl: './edit-car.component.css'
})
export class EditCarComponent {
  car: Car = { ano: '', chassi: '', marca: '', modelo: '', placa: '', renavam: ''} 
  marca: Brand = {id: 0, marca: ''}
  marcas: string[] = [];
  modelos: string[] = [];

  constructor(private carService: CarService, private route: ActivatedRoute){}

   ngOnInit() {
     this.route.paramMap.subscribe(params => {
        const id = params.get('id')?.toString();
        this.carService.getCar(id!).subscribe((data: Car) => {
            this.car = data;
            console.log(this.car.marca)
            console.log(this.car.modelo)
            this.loadBrands()
            this.loadModels()
        })
    }); 

  }
  loadBrands() {
    this.carService.getBrands().subscribe(data => {
      data.forEach((item: any) => {
        this.marcas.push(item.marca)
      });
    });
}

   loadModels() {
     this.carService.getModels(this.car.marca).subscribe(data => {
        this.modelos = data;
    });
  }

  onMarcaChange() {
      this.carService.getModels(this.car.marca).subscribe(data => {
        this.modelos = data;
        this.car.modelo = '';
      });
  }

  editCar = (car: Car) => {
    const missingFields = this.validateCar(car);
    if (missingFields.length > 0) {
        alert(`Por favor, preencha os seguintes campos: ${missingFields.join(', ')}`);
        return;
    }
    console.log(car)
    this.carService.editCar(car.id! ,car).subscribe(data => {
      alert(data)
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
