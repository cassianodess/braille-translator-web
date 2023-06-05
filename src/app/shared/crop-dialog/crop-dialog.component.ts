import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-crop-dialog',
  templateUrl: './crop-dialog.component.html',
  styleUrls: ['./crop-dialog.component.scss']
})
export class CropDialogComponent {
  public title: string = "";
  public content: string = "";
  public onClick = () => {}

  constructor(@Inject(MAT_DIALOG_DATA) public data: {title: string, content: string, onClick: any}) { 
    this.title = data.title;
    this.content = data.content;
    this.onClick = data.onClick;
  }

}
