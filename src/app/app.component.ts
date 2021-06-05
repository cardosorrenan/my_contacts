import { Component, OnInit } from '@angular/core';
import { Person } from './models/person';
import { PersonService } from './services/person.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  persons: Person[] = [];

  constructor(private personService: PersonService) {}
  
  ngOnInit() {
    this.getPersons();
  }

  getPersons() {
    this.personService.getPersons().subscribe((persons: Person[]) => {
      this.persons = persons;
    });
  }
}
