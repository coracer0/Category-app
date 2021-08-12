import { MatDialog } from '@angular/material/dialog';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryResponse } from '@app/shared/models/category.interface';
import { UserResponse } from '@app/shared/models/user.interface';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CategoryService } from './category.service';
import { ModalFormularioComponent } from './component/modal-formulario/modal-formulario.component';
import { DialogConfirmComponent } from '@app/shared/components/dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<any>();
  displayedColumns: string[] = ['cveCategoria', 'nombre', 'descripcion', 'tipo', 'persona', 'editar', 'eliminar'];
  lstCategorias: CategoryResponse[] = [];

  constructor(private catSvc: CategoryService, private _snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.listCategorias();
  }

  private listCategorias(): void {
    this.catSvc.lista()
      .pipe(takeUntil(this.destroy$))
      .subscribe(categorias => this.lstCategorias = categorias)
  }

  onDelete(cveCategoria: number) {
    this.dialog.open(DialogConfirmComponent, {
      disableClose: true,
      data: '¿Realmente quieres eliminar el registro?'
    }).beforeClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        if (result) {
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
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
  onOpenModal(category = {}): void {
    const dialogRef = this.dialog.open(ModalFormularioComponent, {
      disableClose: true,
      data: { title: "Categoria", category }
    })
    dialogRef.beforeClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        if (result) {
          this.listCategorias();
        }
      })
  }


}
