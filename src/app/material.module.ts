import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatAutocompleteModule} from '@angular/material/autocomplete';



@NgModule({
  declarations: [],
  exports: [MatStepperModule,MatFormFieldModule,MatButtonModule,MatInputModule,MatIconModule,MatAutocompleteModule],
  imports: [
    CommonModule, 
  ]
})
export class MaterialModule { }
