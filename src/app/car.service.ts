import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Car {
  id?: number;
  ano: string;
  chassi: string;
  marca: string;
  modelo: string;
  placa: string;
  renavam: string;
}

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private carsUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getBrands(): Observable<string[]> {
    const url = `${this.carsUrl}/cars/brands`;
    return this.http.get<string[]>(url)
      .pipe(
        catchError(this.handleError<string[]>('getBrands', []))
      );
  }

  getModels(brand:string): Observable<string[]> {
    const url = `${this.carsUrl}/cars/models?brand=${brand}`;
    return this.http.get<string[]>(url)
      .pipe(
        catchError(this.handleError<string[]>('getModels', []))
      );
  }

  getCars(): Observable<Car[]> {
    const url = `${this.carsUrl}/cars`;
    return this.http.get<Car[]>(url)
      .pipe(
        catchError(this.handleError<Car[]>('getCars', []))
      );
  }

  getCar(id: string): Observable<Car> {
    const url = `${this.carsUrl}/car/${id}`;
    return this.http.get<Car>(url)
      .pipe(
        catchError(this.handleError<Car>('getCar'))
      );
  }

  newCar(car: Car): Observable<Car> {
    const url = `${this.carsUrl}/car`;
    return this.http.post<Car>(url, car)
      .pipe(
        catchError(this.handleError<Car>('newCar'))
      );
  }

  editCar(id: number, car: Car): Observable<Car> {
    const url = `${this.carsUrl}/car/${id}`;
    return this.http.put<Car>(url, car)
      .pipe(
      catchError(this.handleError<Car>('editCar'))
    );;

  }

  deleteCar(id: number): Observable<void> {
    const url = `${this.carsUrl}/car/${id}`;
    return this.http.delete<void>(url)
      .pipe(
        catchError(this.handleError<void>('deleteCar'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
