import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../../../material.modules';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddRoutingModule } from './add-routing.module';
import { AddComponent } from './add.component';


@NgModule({
  declarations: [
    AddComponent
  ],
  imports: [
    CommonModule,
    AddRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class AddModule { }
