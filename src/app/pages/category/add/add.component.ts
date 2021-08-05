import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from './../category.service';
import { takeUntil } from 'rxjs/operators';
import { Tipo } from '../../../shared/models/category.interface';
import { Subject } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
enum Action{
  EDIT="edit",
  NEW="new"
}

//aqui creas la interface



@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit, OnDestroy {
  
//variables
actionTODO = Action.NEW
private destroy$= new Subject<any>();
tipos:Tipo[]=[
  //aqui los datos de acuerdo a la interfase de arriba uwu tkm lofiu me quieres? yo a ti si :c  pk no me das amor digo cocacola y una pitza
];

  addForm = this.fb.group({
    nombre:['',[Validators.required]],
    descripcion:['',[Validators.required]],
    tipo:['',[Validators.required]]
  });

  constructor(private fb:FormBuilder,private AddSvc:CategoryService,private _snackBar:MatSnackBar) { }
  
  ngOnInit(): void {
  this.getTipos();
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

   private getTipos():void{
    this.AddSvc.getTipos()
    .pipe(takeUntil(this.destroy$))
    .subscribe(tipos =>this.tipos=tipos);

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
