import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PhoneService } from '../services/phone.service';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.scss']
})

export class PhoneComponent implements OnInit {
  
  showFormEditPhone: Boolean = false;

  editPhone = this.formBuilder.group({
    phone: '',
  });

  constructor(
    private phoneService: PhoneService,
    private formBuilder: FormBuilder
  ) {
    this.phone = ''
    this.personId = 0
  }

  toogleForm() {
    const phone = Number(this.phone.split(': ')[1].slice(1,))
    this.editPhone.get('phone')?.setValue(phone)
    this.showFormEditPhone = !this.showFormEditPhone
  }

  @Input() phone: String;
  @Input() personId: number;
  @Output() updateContactList = new EventEmitter();

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { phone } = this.editPhone.value;
    
    const phoneStr = String(phone)
    if (phoneStr.length < 13) {
      return;
    }

    const payload = {
      id: parseInt(this.phone.split(': ')[0]),
      number: '+' + phoneStr,
      person: this.personId
    }

    this.phoneService.updatePhone(payload)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        });

    this.updateContactList.emit();
  }
}
