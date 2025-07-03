import { FormControl, FormGroup, Validators } from "@angular/forms";

export const AddDominadoForm: FormGroup = new FormGroup({
  name: new FormControl('', Validators.required),
  comentario: new FormControl('')
});

export const AddAAprenderForm: FormGroup = new FormGroup({
  name: new FormControl('', Validators.required),
  comentario: new FormControl(''),
  status: new FormControl('', Validators.required),
  prioridade: new FormControl('', Validators.required)
});

export const EditDominadoForm: FormGroup = new FormGroup({
    comentario: new FormControl('')
})

export const EditAAprenderForm: FormGroup = new FormGroup({
  comentario: new FormControl(''),
  status: new FormControl(''),
  prioridade: new FormControl('')
});