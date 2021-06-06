import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Person } from '../models/person';
import { FormBuilder } from '@angular/forms';
import { PersonService } from '../services/person.service';
import { PhoneService } from '../services/phone.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})

export class PersonComponent implements OnInit {

  public isCollapsed = true;
  public newPhone: String = '';

  showFormEditContact: Boolean = false;
  showFormCreatePhone: Boolean = false;

  editContact = this.formBuilder.group({
    name: '',
  });

  createPhone = this.formBuilder.group({
    phone: '',
  });
  
  constructor(
    private phoneService: PhoneService,
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

  updateContactList() {
    this.getPersons.emit();
  }

  onEditContactSubmit(): void {
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
    this.updateContactList();
  }

  deletePerson() {
    this.personService.deletePerson(this.person)
    .subscribe(
      response => {
        console.log('OK');
      },
      error => {
        console.log(error);
      });
    this.updateContactList();
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
        
    this.updateContactList();
  }

  toogleCreatePhone() {
    this.showFormCreatePhone = !this.showFormCreatePhone
  }

  onCreatePhoneSubmit(): void {
    const { phone } = this.createPhone.value;
    
    const phoneStr = String(phone)
    if (phoneStr.length < 13 || this.person.id === undefined) {
      return;
    }

    const payload = {
      number: '+' + phoneStr,
      person: this.person.id,
    }

    this.phoneService.savePhone(payload)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        });

    this.updateContactList();
  }
  
}