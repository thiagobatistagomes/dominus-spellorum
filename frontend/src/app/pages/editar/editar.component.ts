import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { FeiticoService } from "../../services/feitico.service";
import { Component } from "@angular/core";
import { EditAAprenderForm, EditDominadoForm } from "../../shared/models/dashboard/dashBoardForms.model";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { EditarFeiticoAAprenderDTO, EditarFeiticoDominadoDTO } from "../../shared/dto/editarFeitico";
import { CommonModule } from "@angular/common";
import { EventDispatcher } from "@angular/core/primitives/event-dispatch";





@Component({
    selector: 'app-edit',
    imports:[
        ReactiveFormsModule,
        CommonModule
    ],
    providers:[
        FeiticoService
    ],
    templateUrl: './editar.component.html',
    styleUrl: './editar.component.css',
    standalone: true
})
export class EditarComponent {
    editForm!: FormGroup;
    tipoSelecionado: 'dominados' | 'a-aprender' = 'dominados';
    nome!: string;


    constructor (
        private router: Router,
        private feiticoService: FeiticoService,
        private toastr: ToastrService,
        private route: ActivatedRoute
    ){
        this.route.queryParams.subscribe(params => {
            const tipo = params['tipo'];
            const nome = params['nome'];

            if (tipo !== 'dominados' && tipo !== 'a-aprender') {
                this.toastr.error("Tipo inválido ou ausente!");
                this.router.navigate(['/dashboard']);
                return;
            }

            if (!nome) {
                this.toastr.error("Nome do feitiço ausente!");
                this.router.navigate(['/dashboard']);
                return;
            }

            this.tipoSelecionado = tipo;
            this.nome = nome;
            this.initForm();

        });
    }

    initForm() {
        this.editForm = this.tipoSelecionado === 'dominados' ? EditDominadoForm : EditAAprenderForm;
    }

    submit(){
        
        if (this.tipoSelecionado === 'dominados') {
            const editData: EditarFeiticoDominadoDTO = this.editForm.value;
            this.feiticoService.editarFeitico('dominados', this.nome, editData).subscribe({
                next: () => {
                    this.toastr.success("Feitiço editado com sucesso!");
                            this.router.navigate(["/dashboard"]);
                        },
                        error: () => this.toastr.error("Erro inesperado! Tente novamente mais tarde!")
                    });
        } else {
            const editData: EditarFeiticoAAprenderDTO = this.editForm.value;
            this.feiticoService.editarFeitico('a-aprender', this.nome, editData).subscribe({
                next: () => {
                    this.toastr.success("Feitiço editado com sucesso!");
                    this.router.navigate(["/dashboard"]);
                },
                error: () => this.toastr.error("Erro inesperado! Tente novamente mais tarde!")
                });
        }

        this.editForm.reset();
    }

    navigate(){
        this.router.navigate(["/dashboard"]);
    }
}