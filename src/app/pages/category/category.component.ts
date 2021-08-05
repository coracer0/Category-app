import { Component, OnDestroy, OnInit } from '@angular/core';
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
  displayedColumns: string[] = ['cveCategoria', 'nombre', 'descripcion', 'tipo', 'cveRegistro'];
  lstCategorias: CategoryResponse[] = [];
  
  constructor(private catSvc: CategoryService) { }
  
  ngOnInit(): void {
    this.catSvc.lista()
    .pipe(takeUntil(this.destroy$))
    .subscribe(categorias => this.lstCategorias = categorias)
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

}
