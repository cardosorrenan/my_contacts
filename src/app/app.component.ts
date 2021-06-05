import { Component, OnInit } from '@angular/core';
import { Person } from './models/person';
import { PersonService } from './services/person.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  public items = ['a', 'b', 'c'];
  public tarefa = ''
  
  persons: Person[] = [];

  constructor(private personService: PersonService) {}
  
  ngOnInit() {
    this.getCars();
  }

  getCars() {
    this.personService.getCars().subscribe((persons: Person[]) => {
      this.persons = persons;
    });
  }
}
