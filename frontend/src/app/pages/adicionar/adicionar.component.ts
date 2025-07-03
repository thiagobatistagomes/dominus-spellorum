import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { FeiticoService } from "../../services/feitico.service";
import { Component } from "@angular/core";
import { AddAAprenderForm, AddDominadoForm } from "../../shared/models/dashboard/dashBoardForms.model";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AdicionarAAprenderDTO, AdicionarDominadoDTO } from "../../shared/dto/adicionarFeitico";
import { CommonModule } from "@angular/common";





@Component({
    selector: 'app-add',
    imports:[
        ReactiveFormsModule,
        CommonModule
    ],
    providers:[
        FeiticoService
    ],
    templateUrl: './adicionar.component.html',
    styleUrl: './adicionar.component.css',
    standalone: true
})
export class AdicionarComponent {
    addForm!: FormGroup;
    tipoSelecionado: 'dominados' | 'a-aprender' = 'dominados';


    constructor (
        private router: Router,
        private feiticoService: FeiticoService,
        private toastr: ToastrService,
        private route: ActivatedRoute
    ){
        this.route.queryParams.subscribe(params => {
            const tipo = params['tipo'];
            if (tipo !== 'dominados' && tipo !== 'a-aprender') {
                this.toastr.error("Tipo inválido ou ausente!");
                this.router.navigate(['/dashboard']);
                return;
            }
            this.tipoSelecionado = tipo;
            this.initForm();
        });
    }

    initForm() {
        // escolher qual formulario sera usado
        this.addForm = this.tipoSelecionado === 'dominados' ?  AddDominadoForm : AddAAprenderForm;
    }

    submit(){

        if (this.addForm.invalid) {
            this.toastr.error('Preencha o nome do feitiço!');
            return;
        }

        if (this.tipoSelecionado === 'dominados') {
            const addData: AdicionarDominadoDTO = this.addForm.value;
            this.feiticoService.adicionarFeitico('dominados', addData).subscribe({
                next: () => {
                    this.toastr.success("Feitiço adicionado com sucesso!");
                    this.router.navigate(["/dashboard"]);
                },
                error: () => this.toastr.error("Erro inesperado! Tente novamente mais tarde!")
            });
        } else {
            const addData: AdicionarAAprenderDTO = this.addForm.value;
            this.feiticoService.adicionarFeitico('a-aprender', addData).subscribe({
                next: () => {
                    this.toastr.success("Feitiço adicionado com sucesso!");
                    this.router.navigate(["/dashboard"]);
                },
                error: () => this.toastr.error("Erro inesperado! Tente novamente mais tarde!")
            });
        }

        this.addForm.reset();
    }

    navigate(){
        this.router.navigate(["/dashboard"]);
    }
}