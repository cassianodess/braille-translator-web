import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { CropDialogComponent } from 'src/app/shared/crop-dialog/crop-dialog.component';
import { BrailleResponse } from 'src/app/usecases/models/brailleResponse';
import { TranslatorService } from 'src/app/usecases/services/translator.service';
import { getExtension } from 'src/utils/getExtension';
import { savePDF } from 'src/utils/savePDF';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public title: string = 'braille-translator-desktop';
  public file: File | null = null;
  public textArea: FormControl = new FormControl("", [Validators.nullValidator, Validators.required]);
  public response: BrailleResponse | null = null;
  public selectionType: string = "text";
  public imageChangedEvent: string = '';
  public croppedImage: string = '';
  public isCropping: boolean = false;
  public croppedImageFile: File | null = null;
  public isLoading: boolean = false;

  constructor(private service: TranslatorService, public dialog: MatDialog, private _snackBar: MatSnackBar) { }

  public onSubmit() {
    if (this.validation()) {
      this.isLoading = true;
      let formData: FormData = new FormData();
      let input = document.getElementById("file") as HTMLInputElement;

      if (this.selectionType == "file") {
        formData.append(getExtension((this.file as File).name), this.croppedImageFile ? this.croppedImageFile : input.files?.item(0) as File);
      } else {
        formData.append("text", (this.textArea.value as string).trim());

      }

      this.service.translate(formData).subscribe({
        next: (response) => {
          this.response = response;
          this.openDialog()
        },
        error: (err) => this.openSnackBar("Erro ao tentar traduzir, tente novamente!"),
      });

      setTimeout(() => {
        this.isLoading = false;
      }, 500);
    }
  }

  public openSnackBar(message: string,) {
    this._snackBar.open(message, "OK", {
      horizontalPosition: "right",
      verticalPosition: "top",
      duration: 5000,
    });
  }

  public setSelectionType(event: any) {
    this.selectionType = event;
    this.clearForm();

  }

  public clearForm(): void {
    this.croppedImageFile = null;
    this.isCropping = false;
    this.file = null;
    this.textArea.setValue("");
    this.response = null;
  }

  public onFileChange(event: Event) {

    let newFile: File = (event.target as HTMLInputElement).files?.item(0) as File;
    if (newFile) {
      this.clearForm();
      this.file = newFile;

      if (this.isImage()) {
        this.isCropping = true;
      } else {
        this.isCropping = false;
      }
    }
  }

  public isImage() {
    return getExtension((this.file as File).name) == "image";
  }

  public validation() {
    return this.file !== null || (this.textArea.value as string).trim().length > 0;
  }

  public imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64 as string;
  }

  public loadImageFailed() {
    console.log("FALHOOU")
  }

  public onCrop() {
    fetch(this.croppedImage)
      .then(res => res.blob())
      .then(blob => {
        const file = new File([blob], this.file?.name as string, { type: `image/${this.file?.name.split(".")[1]}` })
        this.croppedImageFile = file;
        this.isCropping = false;
      });

  }

  public onCancelCrop() {
    this.croppedImage = "";
    this.file = null;
    this.croppedImageFile = null;
    this.isCropping = false;
  }

  public openDialog() {
    const dialogRef = this.dialog.open(CropDialogComponent, {
      data: {
        title: "Tradução",
        content: this.response?.data.braille,
        onClick: () => savePDF(this.response?.data.braille as string, this.file !== null ? this.file?.name.split(".")[0] as string : "braille"),
      }
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  public onUndo() {
    this.croppedImageFile = null;
    this.croppedImage = "";
    this.isCropping = true;
  }
}
