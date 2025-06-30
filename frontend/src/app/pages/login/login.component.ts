
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginDTO } from '../../shared/dto/login.dto';
import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  providers: [
    AuthService
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.loginForm = new FormGroup ({
      email: new FormControl('', [Validators.required, Validators.email]),
      senha: new FormControl('', [Validators.required, Validators.minLength(4)])
    });
  }


  submit(){
    const loginData: LoginDTO = this.loginForm.value;

    this.authService.login(loginData).subscribe({
      next: () => {this.toastr.success("Login realizado com sucesso!"), this.router.navigate(["dashboard"])},
      error: () => this.toastr.error("Erro inesperado! Tente novamente mais tarde!")
    })
  }

  navigate(){
    this.router.navigate(["/auth/register"])
  }
}