import { FormControl, FormGroup, Validators } from "@angular/forms"

export const RegisterForm: FormGroup = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required, Validators.minLength(4)]),
    confirmarSenha: new FormControl('', [Validators.required, Validators.minLength(4)])
})