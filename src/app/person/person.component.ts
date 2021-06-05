import { Component, OnInit, Input } from '@angular/core';
import { Person } from '../models/person';


@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})

export class PersonComponent implements OnInit {

  public isCollapsed = true;

  constructor() {
    this.person = {
      name: '',
      favorite: false,
      phones: []
    }    
  }

  @Input() person: Person;

  ngOnInit(): void {
  }

}