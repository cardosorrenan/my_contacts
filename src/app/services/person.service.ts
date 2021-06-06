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

  url = environment.apiUrl + '/persons';

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(`${environment.username}:${environment.password}`)
    })
  };

  getPersons(): Observable<Person[]> {
    return this.httpClient.get<Person[]>(this.url + '/', this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getOnePerson(person: Person): Observable<Person> {
    return this.httpClient.get<Person>(this.url + '/' + person.id + '/', this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  savePerson(person: Person): Observable<Person> {
    return this.httpClient.post<Person>(this.url + '/', JSON.stringify(person), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  updatePerson(person: Person): Observable<Person> {
    const id = person.id
    delete person['id']
    return this.httpClient.patch<Person>(this.url + '/' + id + '/', JSON.stringify(person), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  deletePerson(person: Person) {
    return this.httpClient.delete<Person>(this.url + '/' + person.id + '/', this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error code: ${error.status}, ` + `message: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}