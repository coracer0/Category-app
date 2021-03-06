import { User } from './../../../../shared/models/user.interface';
import { CategoryService } from './../../category.service';
import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { AuthService } from '@app/pages/auth/auth.service';
import { CategoryResponse } from '@app/shared/models/category.interface';

enum Action {

  EDIT="edit",
  NEW="new"

}

interface Tipo {
  value: number;
  viewValue: string;
}


@Component({
  selector: 'app-modal-formulario',
  templateUrl: './modal-formulario.component.html',
  styleUrls: ['./modal-formulario.component.scss']
})
export class ModalFormularioComponent implements OnInit, OnDestroy {

  tipos: Tipo[] = [
    { value: 1, viewValue: 'Videojuego' },
    { value: 2, viewValue: 'Ropa' },
    { value: 3, viewValue: 'Electrodomesticos' }
  ];
  //variables
  actionTODO = Action.NEW
  private destroy$ = new Subject<any>()

  updForm = this.fb.group({
    cveCategoria: [''],
    nombre: ['', [
      Validators.required,
      Validators.maxLength(250)
    ]],
    descripcion: ['', [
      Validators.required,
      Validators.maxLength(500)
    ]],
    tipo: ['', [
      Validators.required
    ]],
    cveRegistro: this.authSvc.userValue?.cveUsuario
  });


  constructor(public dialogRef: MatDialogRef<ModalFormularioComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private AddSvc: CategoryService, private _snackBar: MatSnackBar, private authSvc: AuthService) { }


  ngOnInit(): void {
    if (this.data?.category.hasOwnProperty('nombre')) {
      this.actionTODO = Action.EDIT;
      this.data.title = "Editar Categoria";
      this.editar();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  onSave(): void {
    
     if (this.updForm.invalid)
      return;
    const formValue = this.updForm.value;

    if(this.actionTODO==Action.NEW){
      
      this.AddSvc.new(formValue)
      .pipe(takeUntil(this.destroy$))
      .subscribe(result =>{
        this._snackBar.open(result.message,'',{
        duration:6000
      });
      this.dialogRef.close(true);
      });
    }else{
      this.AddSvc.update(formValue)
        .pipe(takeUntil(this.destroy$))
        .subscribe(result => {
          this._snackBar.open(result.message, '', {
            duration: 6000
          });
          this.dialogRef.close(true);
        });
        
    } 
  }

  private editar(): void {
    this.updForm.patchValue({
      cveCategoria: this.data.category?.cveCategoria,
      nombre : this.data.category?.nombre,
      descripcion: this.data.category?.descripcion,
      tipo: this.data.category?.tipo,
      cveRegistro: this.data.category?.cveRegistro
    });

  }

  getErrorMessage(field: string): string {
     let message = "";
    const campo = this.updForm?.get(field);

    if (campo != null) {
     if (campo.errors?.required) {
        message = "Este campo es requerido"; 
      }else  if (campo.errors?.maxLength) {
        message = "Los caracteres se han rebasado los caracteres m??ximos";
      } 
    } 
    return message;
  }


}