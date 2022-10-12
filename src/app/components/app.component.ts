import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cep } from '../interfaces/cep';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public erro: {
    tipo?: number,
    mensagem?: string
  } = {}

  public form: FormGroup = this.formBuilder.group({
    cep: ['', Validators.required]
  })

  public cep?: Cep


  constructor(
    private formBuilder: FormBuilder,
    private appService: AppService
  ){}

  public buscar(){
    if(this.form.get('cep')?.valid){
      if(this.isCepInvalido(this.form.get('cep')?.value)){
        this.erro.mensagem = 'CEP não é valido'
      }else{
        this.appService.listar(this.form.get('cep')?.value).subscribe({
          next: (res) => {
            if(res.cep){
              this.cep = res
              this.erro.tipo = undefined
              this.erro.mensagem = undefined
            }else{
              this.erro.tipo = 2
              this.erro.mensagem = 'Sem dados para emitir'
            }
            this.form.get('cep')?.setValue('')
          },
          error: (error) => {
            this.erro.tipo = 1
            this.erro.mensagem = error.message
          }
        })
      }
    }
  }

  public isCepInvalido(cep: string){
    return /\D/.test(cep)
  }
}
