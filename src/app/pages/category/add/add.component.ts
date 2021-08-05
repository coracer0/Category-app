import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from './../category.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { AuthService } from '@app/pages/auth/auth.service';
enum Action{
  EDIT="edit",
  NEW="new"
}

interface Tipo {
  value: number;
  viewValue: string;
}


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit, OnDestroy{  

  tipos:Tipo[]=[
    {value: 1, viewValue: 'Videojuego'},
    {value: 2, viewValue: 'Ropa'},
    {value: 3, viewValue: 'Electrodomestiocs'}
  ];
  //variables
actionTODO = Action.NEW
private destroy$= new Subject<any>()

  addForm = this.fb.group({
    nombre:['',[Validators.required]],
    descripcion:['',[Validators.required]],
    tipo:['',[Validators.required]],
    cveRegistro: this.authSvc.userValue?.cveUsuario
  });

  constructor(private fb:FormBuilder,private AddSvc:CategoryService,private _snackBar:MatSnackBar, private authSvc: AuthService) { }
  
  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  onSave():void{
    if(this.addForm.invalid)
      return;

    const formValue=this.addForm.value;

    if(this.actionTODO==Action.NEW){
      
      this.AddSvc.new(formValue)
      .pipe(takeUntil(this.destroy$))
      .subscribe(result =>{
        this._snackBar.open(result.message,'',{
        duration:6000
      });
      });
    }else{
      //update
    }
    
  }

}