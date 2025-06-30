import { Component } from "@angular/core";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { RegisterForm } from "../../shared/models/registerForm.model";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { RegisterDTO } from "../../shared/dto/register.dto";
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from "@angular/common";





@Component({
    selector: 'app-register',
    imports:[
        ReactiveFormsModule,
        CommonModule
    ],
    providers:[
        AuthService
    ],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css',
    standalone: true
})
export class RegisterComponent {
    registerForm: FormGroup = RegisterForm;

    constructor(
        private router: Router,
        private authService: AuthService,
        private toastr: ToastrService
    ) {

    }

    submit(){
        const registerData: RegisterDTO = this.registerForm.value;

        if (this.registerForm.invalid) {
            this.toastr.error('Todos os campos são obrigatórios.');
            this.registerForm.markAllAsTouched();
            return;
        }

        const senha = this.registerForm.get('senha')?.value;
        const confirmar = this.registerForm.get('confirmarSenha')?.value;

        if(senha.length < 4){
            this.toastr.error('A senha deve ter no mínimo 4 caracteres.');
        }

        if (senha !== confirmar) {
            this.toastr.error('As senhas não coincidem.');
            return;
        }


        this.authService.register(registerData).subscribe({
            next: () => {this.toastr.success("Cadastro realizado com sucesso!"), this.router.navigate(["auth/login"])},
            error: () => this.toastr.error("Erro inesperado! Tente novamente mais tarde!")
        })
    }

    navigate(){
        this.router.navigate(["auth/login"])
    }
}