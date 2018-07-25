import {NgModule} from '@angular/core';
import {MatButtonModule, MatIcon, MatIconModule} from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatIconModule],
  exports: [MatButtonModule, MatIconModule]
})
export class MaterialModule{}
