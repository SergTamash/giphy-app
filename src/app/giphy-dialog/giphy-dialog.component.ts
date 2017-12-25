import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'giphy-dialog',
  templateUrl: 'giphy-dialog.component.html',
  styleUrls: ['giphy-dialog.component.css']
})
export class GiphyDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
