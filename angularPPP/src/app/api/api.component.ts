import { Component, OnInit } from '@angular/core';
import { SmartphoneDto } from '../models/smartphone.interface';
import { SmartphoneService } from '../services/smartphone.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.css']
})

export class ApiComponent implements OnInit {
  array: SmartphoneDto[] = new Array<SmartphoneDto>();

  smartphoneFormGroup: FormGroup = new FormGroup({
    id: new FormControl<number>(+''),

    name: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3)
    ]),

    price: new FormControl<number>(+'', [
      Validators.required,
      Validators.pattern('[0-9]*'),
    ])
  });

  get name() {
    return this.smartphoneFormGroup.get('name');
  }

  get price() {
    return this.smartphoneFormGroup.get('price');
  }

  addOrPut = false;

  constructor(private smartphoneService:SmartphoneService) { }

  ngOnInit(): void {
    this.getSmartphone();
  }

  getSmartphone() {
    this.smartphoneService.getAll()
    .subscribe((data: SmartphoneDto[]) =>{
      this.array = data;
    })
  }

  deleteSmartphone(id: number){
    this.smartphoneService.delete(id).subscribe(
      () => {this.array = this.array.filter( (aSmartphone) => aSmartphone.id != id)
      })
  }

  postSmartphone(){
//if(!confirm(`api.component.ts:58 -> Did you run the JSON-SERVER ? if yes please comment this line`)) alert(`You should run the json-server  (read README file) ^^`);
    this.smartphoneService.post(this.smartphoneFormGroup.value)
    /*
      this.smartphoneFormGroup.value is equivalent to:
      {
        name,
        price
      }
    */
    .subscribe(
      (eachSmartphone: any)=>{
          this.array = [eachSmartphone, ...this.array];
          this.clearInputs();
    })

  }

  // make inputs empty
  clearInputs(){
    this.smartphoneFormGroup.reset({
      name: '',
      price: +''
    });
  }

  // edit smartphoneService
  editSmartphone(eachSmartphone: SmartphoneDto){
    this.smartphoneFormGroup.get('id')?.setValue(eachSmartphone.id);
    this.smartphoneFormGroup.get('name')?.setValue(eachSmartphone.name);
    this.smartphoneFormGroup.get('price')?.setValue(eachSmartphone.price);
    this.addOrPut=true;
  }

  // update smartphoneService
  putSmartphone(){
    this.smartphoneService.updateSmartphone(this.smartphoneFormGroup.value)
    .subscribe( () => {
      this.clearInputs();
      this.addOrPut = false;
    })
  }
}
