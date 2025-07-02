import { FormControl, FormGroup, Validators } from "@angular/forms";

export const AddForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    comentario: new FormControl('')
})

export const EditForm: FormGroup = new FormGroup({
    comentario: new FormControl('')
})