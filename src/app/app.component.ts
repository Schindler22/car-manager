import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListCarsComponent } from './list-cars/list-cars.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ListCarsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'car-manager';
}
