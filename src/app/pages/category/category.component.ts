import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryResponse } from '@app/shared/models/category.interface';
import { UserResponse } from '@app/shared/models/user.interface';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CategoryService } from './category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<any>();
  displayedColumns: string[] = ['cveCategoria', 'nombre', 'descripcion', 'tipo', 'cveRegistro', 'editar', 'eliminar'];
  lstCategorias: CategoryResponse[] = [];
  
  constructor(private catSvc: CategoryService, private _snackBar: MatSnackBar) { }
  
  ngOnInit(): void {
    this.listCategorias();
  }

  private listCategorias(): void {
    this.catSvc.lista()
    .pipe(takeUntil(this.destroy$))
    .subscribe(categorias => this.lstCategorias = categorias)
  }

  onDelete(cveCategoria: number) {
    this.catSvc.delete(cveCategoria)
    .pipe(takeUntil(this.destroy$))
    .subscribe(result => {
      if (result) {
        this._snackBar.open(result.message, '', {
          duration: 6000
        });
        this.listCategorias();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

}
