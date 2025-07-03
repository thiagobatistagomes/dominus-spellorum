import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  constructor (
    private router: Router,
    private toastr: ToastrService
  ) {

  }

  get isLoggedIn(): boolean {
    // true se existir token false se não houver
    // dupla negação ou !! de null = false
    // dupla negacao ou !! algumastring = true
    return !!localStorage.getItem('token');
  }

  get nome(): string {
    return localStorage.getItem('nome') || '';
  }

  logout() {
    localStorage.clear();
    this.toastr.success("Melfeito Feito!");
    this.router.navigate(['']);
  }

  navigate() {
    this.router.navigate([''])
  }
}
