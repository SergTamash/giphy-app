import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatGridListModule,
    MatDialogModule
  ],
  exports: [
    MatButtonModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatGridListModule,
    MatDialogModule
  ],
  declarations: []
})
export class CustomMaterialModule { }


