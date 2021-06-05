import { Component, OnInit } from '@angular/core';
import { Person } from './models/person';
import { FormBuilder } from '@angular/forms';
import { PersonService } from './services/person.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  persons: Person[] = [];
  name: String = '';
  showFormContact: Boolean = false;

  createContact = this.formBuilder.group({
    name: '',
  });

  constructor(
    private personService: PersonService,
    private formBuilder: FormBuilder,
  ) {}

  toogleForm() {
    this.showFormContact = !this.showFormContact
  }
  
  ngOnInit() {
    this.getPersons();
  }

  getPersons() {
    this.personService.getPersons().subscribe((persons: Person[]) => {
      this.persons = persons;
    });
  }

  onSubmit(): void {
    const { name } = this.createContact.value;
    
    if (name.length === '') {
      return;
    }

    const payload = {
      name,
      favorite: false,
      phones: []
    };

    this.personService.savePerson(payload)
      .subscribe(
        error => {
          console.log(error);
        });

    this.createContact.reset();
    this.getPersons();
    this.showFormContact = !this.showFormContact;
  }
}
