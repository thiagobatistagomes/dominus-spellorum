import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { FeiticoResponseDTO } from '../shared/dto/feiticoResponse';
import { AdicionarFeiticoDTO } from '../shared/dto/adicionarFeitico';
import { EditarFeiticoDTO } from '../shared/dto/editarFeitico';

@Injectable({
  providedIn: 'root'
})
export class FeiticoService {

  private httpClient = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/feiticos';

  constructor() {}


  getFeiticosDoUsuario(): Observable<{
    feiticosDominados: FeiticoResponseDTO[],
    feiticosAAprender: FeiticoResponseDTO[]
  }> {
    return this.httpClient.get<{
      feiticosDominados: FeiticoResponseDTO[],
      feiticosAAprender: FeiticoResponseDTO[]
    }>(this.apiUrl);
  }

  adicionarFeitico(tipo: 'dominados' | 'a-aprender', dto: AdicionarFeiticoDTO): Observable<{ mensagem: string }> {
    // se o tipo for dominados usar dominados, senao usar a aprender
    // if(tipo === 'dominados'){
    //    endpoint = 'dominados';
    //}else{
    //    endpoint = 'a-aprender';
    //}
    const endpoint = tipo === 'dominados' ? 'dominados' : 'a-aprender';
    return this.httpClient.post<{ mensagem: string }>(`${this.apiUrl}/${endpoint}`, dto).pipe(
      tap(res => console.log(res.mensagem))
    );
  }


  editarFeitico(tipo: 'dominados' | 'a-aprender', nome: string, dto: EditarFeiticoDTO): Observable<{ mensagem: string }> {
    const endpoint = tipo === 'dominados' ? 'dominados' : 'a-aprender';
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
