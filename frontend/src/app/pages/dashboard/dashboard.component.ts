import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FeiticoService } from '../../services/feitico.service';
import { FeiticoAAprenderResponseDTO, FeiticoDominadoResponseDTO } from '../../shared/dto/feiticoResponse';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  feiticosDominados: FeiticoDominadoResponseDTO[] = [];
  feiticosAAprender: FeiticoAAprenderResponseDTO[] = [];
  feiticoSelecionado: { tipo: 'dominados' | 'a-aprender', nome: string } | null = null;

  loading = true;
  error = '';


  constructor(
    private feiticoService: FeiticoService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.carregarDashboard();
  }


  selecionarFeitico(tipo: 'dominados' | 'a-aprender', nome: string) {
    this.feiticoSelecionado = { tipo, nome };
  }

  carregarDashboard(): void {
    this.loading = true;
    this.error = '';
    this.feiticoService.getFeiticosDoUsuario().subscribe({
      next: res => {
        this.feiticosDominados = res.feiticosDominados;
        this.feiticosAAprender = res.feiticosAAprender;
        this.loading = false;
      },
      error: err => {
        console.error(err);
        this.error = 'Erro ao carregar dados do dashboard.';
        this.loading = false;
      }
    });
  }

  adicionarDominado() {
    this.router.navigate(['/adicionar'], { queryParams: { tipo: 'dominados' } });
  }

  adicionarAAprender() {
    this.router.navigate(['/adicionar'], { queryParams: { tipo: 'a-aprender' } });
  }

  editarDominado(nome: string) {
    this.router.navigate(['/editar'], { queryParams: { tipo: 'dominados', nome: nome }});
  }

  editarAAprender(nome: string) {
    this.router.navigate(['/editar'], { queryParams: { tipo: 'a-aprender', nome: nome }});
  }

  excluirDominado(nome: string) {
    if (!confirm(`Tem certeza que deseja excluir o feitiço dominado "${nome}"?`)) {
      return;
    }

    this.feiticoService.excluirFeitico('dominados', nome).subscribe({
      next: () => {
        this.toastr.success('Feitiço excluído com sucesso!');
        this.carregarDashboard();
      },
      error: () => this.toastr.error('Erro ao excluir! Tente novamente.')
    });
  }

  excluirAAprender(nome: string) {
    if (!confirm(`Tem certeza que deseja excluir o feitiço a aprender "${nome}"?`)) {
      return;
    }

    this.feiticoService.excluirFeitico('a-aprender', nome).subscribe({
      next: () => {
        this.toastr.success('Feitiço excluído com sucesso!');
        this.carregarDashboard();
      },
      error: () => this.toastr.error('Erro ao excluir! Tente novamente.')
    });
  }


}
