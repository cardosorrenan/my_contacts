import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Person } from '../models/person';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  url = environment.apiUrl + '/persons/?format=json';

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Basic ' + btoa(`${environment.username}:${environment.password}`)
    })
  };

  getCars(): Observable<Person[]> {
    return this.httpClient.get<Person[]>(this.url, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  
  /* getCarById(id: number): Observable<Person> {
    return this.httpClient.get<Person>(this.url + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // salva um carro
  saveCar(car: Person): Observable<Person> {
    return this.httpClient.post<Person>(this.url, JSON.stringify(car), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // utualiza um carro
  updateCar(car: Person): Observable<Person> {
    return this.httpClient.put<Person>(this.url + '/' + car.id, JSON.stringify(car), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // deleta um carro
  deleteCar(car: Person) {
    return this.httpClient.delete<Person>(this.url + '/' + car.id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  */
  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}