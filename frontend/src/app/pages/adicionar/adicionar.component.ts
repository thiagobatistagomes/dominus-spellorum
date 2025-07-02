import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { FeiticoService } from "../../services/feitico.service";
import { Component } from "@angular/core";
import { AddForm } from "../../shared/models/dashboard/dashBoardForms.model";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AdicionarFeiticoDTO } from "../../shared/dto/adicionarFeitico";
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
    addForm: FormGroup = AddForm;
    tipoSelecionado: 'dominados' | 'a-aprender' = 'dominados';


    constructor (
        private router: Router,
        private feiticoService: FeiticoService,
        private toastr: ToastrService,
        private route: ActivatedRoute
    ){
        this.route.queryParams.subscribe(params => {
            const tipo = params['tipo'];
            if (tipo === 'dominados' || tipo === 'a-aprender') {
            this.tipoSelecionado = tipo;
            } else {
            this.toastr.error("Tipo inválido ou ausente!");
            this.router.navigate(['/dashboard']);
            }
        });
    }

    submit(){
        const addData: AdicionarFeiticoDTO = this.addForm.value;
        
        if (this.addForm.invalid) {
            this.toastr.error('Preencha o nome do feitiço!');
            return;
        }

        this.feiticoService.adicionarFeitico(this.tipoSelecionado, addData).subscribe({
            next: () => {this.toastr.success("Feitiço adicionado com sucesso!"), this.router.navigate(["/dashboard"])},
            error: () => this.toastr.error("Erro inesperado! Tente novamente mais tarde!")
        })

        this.addForm.reset();
    }

    navigate(){
        this.router.navigate(["/dashboard"]);
    }
}