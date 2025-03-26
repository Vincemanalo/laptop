import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modalinfo',
  templateUrl: './modalinfo.component.html',
  styleUrls: ['./modalinfo.component.css'],
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule],
  changeDetection: ChangeDetectionStrategy.OnPush, // Optimized change detection
})
export class ModalinfoComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public selectedLaptop: any,
    public dialogRef: MatDialogRef<ModalinfoComponent>
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
