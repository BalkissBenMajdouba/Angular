import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { SmartphoneDto } from '../models/smartphone.interface';

@Injectable({
  providedIn: 'root'
})
export class SmartphoneService {
  urlApi= environment.api;

  constructor(private http:HttpClient) {   }

  // GET all
  getAll(){
    return this.http.get<SmartphoneDto[]>(this.urlApi);
  }

  // DELETE one
  delete(id: number){
    return this.http.delete(`${this.urlApi}/${id}`);
  }

  // CREATE one
  post(smartphone: SmartphoneDto){
      return this.http.post<SmartphoneDto>(this.urlApi, smartphone);
  }

  // UPDATE one
  updateSmartphone(smartphone: SmartphoneDto){
    return this.http.put(`${this.urlApi}/${smartphone.id}`, smartphone);
  }

  // search by id
  search(id: number){
      return this.http.get<SmartphoneDto>(`${this.urlApi}/${id}`); //${id}
  }

}


