import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { FeiticoService } from "../../services/feitico.service";
import { Component } from "@angular/core";
import { EditForm } from "../../shared/models/dashboard/dashBoardForms.model";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { EditarFeiticoDTO } from "../../shared/dto/editarFeitico";
import { CommonModule } from "@angular/common";





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
    editForm: FormGroup = EditForm;
    tipoSelecionado: 'dominados' | 'a-aprender' = 'dominados';
    nomeFeitico!: string;


    constructor (
        private router: Router,
        private feiticoService: FeiticoService,
        private toastr: ToastrService,
        private route: ActivatedRoute
    ){
        this.route.queryParams.subscribe(params => {
            const tipo = params['tipo'];
            const nome = params['nome'];

            if (tipo === 'dominados' || tipo === 'a-aprender') {
                this.tipoSelecionado = tipo;
            } else {
                this.toastr.error("Tipo inválido ou ausente!");
                this.router.navigate(['/dashboard']);
            }

            if (nome) {
                this.nomeFeitico = nome;
            } else {
                this.toastr.error("Nome do feitiço ausente!");
                this.router.navigate(['/dashboard']);
            }

        });
    }

    submit(){
        const editData: EditarFeiticoDTO = this.editForm.value;
        
        if (!this.nomeFeitico || !this.tipoSelecionado) {
            this.toastr.error('Dados insuficientes para editar!');
            return;
        }

        this.feiticoService.editarFeitico(this.tipoSelecionado, this.nomeFeitico, editData).subscribe({
            next: () => {this.toastr.success("Comentário adicionado com sucesso!"), this.router.navigate(["/dashboard"])},
            error: () => this.toastr.error("Erro inesperado! Tente novamente mais tarde!")
        })

        this.editForm.reset();
    }

    navigate(){
        this.router.navigate(["/dashboard"]);
    }
}