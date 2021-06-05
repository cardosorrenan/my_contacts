import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.scss']
})

export class PhoneComponent implements OnInit {
  
  constructor() {
    this.phone = ''
  }

  @Input() phone: String;  

  ngOnInit(): void {
  }

}
