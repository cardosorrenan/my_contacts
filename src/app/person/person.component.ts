import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Person } from '../models/person';
import { FormBuilder } from '@angular/forms';
import { PersonService } from '../services/person.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})

export class PersonComponent implements OnInit {

  public isCollapsed = true;
  showFormEditContact: Boolean = false;

  editContact = this.formBuilder.group({
    name: '',
  });
  
  constructor(
    private personService: PersonService,
    private formBuilder: FormBuilder
  ) {
    this.person = {
      name: '',
      favorite: false,
      phones: []
    }    
  }

  toogleForm() {
    this.editContact.get('name')?.setValue(this.person.name)
    this.showFormEditContact = !this.showFormEditContact
  }

  @Output() getPersons = new EventEmitter();
  @Input() person: Person;

  ngOnInit() {
  }

  onSubmit(): void {
    const { name } = this.editContact.value;
    
    if (name.length === '') {
      return;
    }

    const payload = {
      id: this.person.id,
      name,
      favorite: this.person.favorite
    }

    this.personService.updatePerson(payload)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        });

    this.editContact.reset();
    this.showFormEditContact = false;
    this.getPersons.emit();
  }

  deletePerson() {
    this.personService.deletePerson(this.person)
    .subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      });
    this.getPersons.emit();
  }

  confirmationDelete() {
    if(confirm("Are you sure to delete " + this.person.name + "?")) {
      this.deletePerson();
    }
  }

  updateFavorite(isFavorite: boolean) {
    const payload = {
      id: this.person.id,
      name: this.person.name,
      favorite: isFavorite
    }

    this.personService.updatePerson(payload)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        });
        
    this.getPersons.emit();
  }
  
}