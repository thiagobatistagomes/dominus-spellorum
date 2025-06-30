import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { TokenDTO } from '../shared/dto/token.dto';
import { RegisterDTO } from '../shared/dto/register.dto';
import { LoginDTO } from '../shared/dto/login.dto';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl: string = "http://localhost:3000/auth"

  private httpClient = inject(HttpClient)

  constructor() { }

  login(loginData: LoginDTO){
    return this.httpClient.post<TokenDTO>(`${this.apiUrl}/login`, loginData).pipe(
      tap((value) => {
        localStorage.setItem('mensagem', value.mensagem)
        localStorage.setItem('token', value.token)
        localStorage.setItem('nome', value.nome)
      })
    )
  }

  register(registerData: RegisterDTO) {
    return this.httpClient.post<{ mensagem: string }>(`${this.apiUrl}/register`, registerData).pipe(
      tap(value => {
        localStorage.setItem('mensagem', value.mensagem);
      })
    );
  }

}
