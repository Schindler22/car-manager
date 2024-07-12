import { Routes } from '@angular/router';
import { NewCarComponent } from './new-car/new-car.component';
import { ListCarsComponent } from './list-cars/list-cars.component';
import { EditCarComponent } from './edit-car/edit-car.component';

export const routes: Routes = [
    { path: '', redirectTo: "/list-cars", pathMatch: 'full' },
    { path: 'list-cars', component: ListCarsComponent },
    { path: 'new-car', component: NewCarComponent },
    { path: 'edit-car/:id', component: EditCarComponent }
];
