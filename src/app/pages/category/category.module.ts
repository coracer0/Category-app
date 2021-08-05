import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';
import { MaterialModule } from '@app/material.modules';
import { ModalFormularioComponent } from './component/modal-formulario/modal-formulario.component';


@NgModule({
  declarations: [
    CategoryComponent,
    ModalFormularioComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class CategoryModule { }
