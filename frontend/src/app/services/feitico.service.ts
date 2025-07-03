import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { FeiticoAAprenderResponseDTO, FeiticoDominadoResponseDTO } from '../shared/dto/feiticoResponse';
import { AdicionarDominadoDTO, AdicionarAAprenderDTO } from '../shared/dto/adicionarFeitico';
import { EditarFeiticoDominadoDTO, EditarFeiticoAAprenderDTO } from '../shared/dto/editarFeitico';

@Injectable({
  providedIn: 'root'
})
export class FeiticoService {

  private httpClient = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/feiticos';

  constructor() {}


  getFeiticosDoUsuario(): Observable<{
    feiticosDominados: FeiticoDominadoResponseDTO[],
    feiticosAAprender: FeiticoAAprenderResponseDTO[]
  }> {
    return this.httpClient.get<{
      feiticosDominados: FeiticoDominadoResponseDTO[],
      feiticosAAprender: FeiticoAAprenderResponseDTO[]
    }>(this.apiUrl);
  }

  adicionarFeitico(
    tipo: 'dominados',
    dto: AdicionarDominadoDTO
  ): Observable<{ mensagem: string }>;
  adicionarFeitico(
    tipo: 'a-aprender',
    dto: AdicionarAAprenderDTO
  ): Observable<{ mensagem: string }>;
  adicionarFeitico(
    tipo: 'dominados' | 'a-aprender',
    dto: AdicionarDominadoDTO | AdicionarAAprenderDTO
  ): Observable<{ mensagem: string }> {
    const endpoint = tipo;
    return this.httpClient.post<{ mensagem: string }>(`${this.apiUrl}/${endpoint}`, dto).pipe(
      tap(res => console.log(res.mensagem))
    );
  }


  editarFeitico(
    tipo: 'dominados',
    nome: string,
    dto: EditarFeiticoDominadoDTO
  ): Observable<{ mensagem: string }>;
  editarFeitico(
    tipo: 'a-aprender',
    nome: string,
    dto: EditarFeiticoAAprenderDTO
  ): Observable<{ mensagem: string }>;
  editarFeitico(
    tipo: 'dominados' | 'a-aprender',
    nome: string,
    dto: EditarFeiticoDominadoDTO | EditarFeiticoAAprenderDTO
  ): Observable<{ mensagem: string }> {
    const endpoint = tipo;
    return this.httpClient.put<{ mensagem: string }>(`${this.apiUrl}/${endpoint}/${nome}`, dto).pipe(
      tap(res => console.log(res.mensagem))
    );
  }

  excluirFeitico(tipo: 'dominados' | 'a-aprender', nome: string): Observable<{ mensagem: string }> {
    const endpoint = tipo === 'dominados' ? 'dominados' : 'a-aprender';
    return this.httpClient.delete<{ mensagem: string }>(`${this.apiUrl}/${endpoint}/${nome}`).pipe(
      tap(res => console.log(res.mensagem))
    );
  }


}
