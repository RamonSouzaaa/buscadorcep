import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cep } from '../interfaces/cep';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(
    private http: HttpClient
  ) { }

  public listar(cep: string){
    const API: string = `https://viacep.com.br/ws/${cep}/json`
    return this.http.get<Cep>(API).pipe(
      res => res,
      error => error
    )
  }

}
