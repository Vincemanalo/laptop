import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { FeaturesService } from '../features.service';

// Import standalone components
import { ModalDesktopComponent } from '../../core/modaldesktop/modaldesktop.component';
import { UpdatesComponent } from '../../core/updates/updates.component';
import { DeleteComponent } from '../../core/delete/delete.component';

interface Desktop {
  desktopName: string;
  desktopSerialNumber: string;
  desktopDescription: string;
  desktopPurchaseDate: Date;
  desktopLocation: string;
  assignedTo: string;
  desktopCondition: string;
}

@Component({
  selector: 'app-desktop-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    ModalDesktopComponent, // Ensure this is a standalone component
    UpdatesComponent, 
    DeleteComponent
  ],
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.css']
})
export class DesktopComponent implements OnInit {
  displayedColumns: string[] = [
    'desktopSerialNumber',
    'desktopPurchaseDate',
    'desktopLocation',
    'assignedTo',
    'desktopCondition',
    'actions',
  ];

  desktops: Desktop[] = [

  ];

  isModalOpen = false;
  isEditModalOpen = false;
  isDeleteModalOpen = false;
  searchKeyword = '';
  selectedDesktop: Desktop | null = null;

  constructor(private featuresService: FeaturesService) {}

  ngOnInit(): void {}

  openModal(desktop?: Desktop) {
    this.isModalOpen = true;
    this.selectedDesktop = desktop || null;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  openEditModal(desktop: Desktop) {
    this.isEditModalOpen = true;
    this.selectedDesktop = desktop;
  }

  closeEditModal(): void {
    this.isEditModalOpen = false;
  }

  openDeleteModal(desktop: Desktop) {
    this.isDeleteModalOpen = true;
    this.selectedDesktop = desktop;
  }

  closeDeleteModal(): void {
    this.isDeleteModalOpen = false;
  }

  onSearch(): void {
    const keyword = this.searchKeyword.trim().toLowerCase();
    if       (keyword) {
this.desktops = this.desktops.filter(
        (desktop) =>
          desktop.desktopName.toLowerCase().includes(keyword) ||
          desktop.desktopSerialNumber.toLowerCase().includes(keyword) ||
          desktop.desktopDescription.toLowerCase().includes(keyword) ||
          desktop.desktopLocation.toLowerCase().includes(keyword) ||
          desktop.assignedTo.toLowerCase().includes(keyword) ||
          desktop.desktopCondition.toLowerCase().includes(keyword)
      );
    }
  }

  clearSearch(): void {
    this.searchKeyword = '';
  }
}
