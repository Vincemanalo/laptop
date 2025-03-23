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
import { ModalserverComponent } from '../../core/modalserver/modalserver.component';
import { UpdatesComponent } from '../../core/updates/updates.component';
import { DeleteComponent } from '../../core/delete/delete.component';

interface Server {
  serverSerialNumber: string;
  serverPurchaseDate: Date;
  serverLocation: string;
  assignedAdmin: string;
  serverStatus: string;
}

@Component({
  selector: 'app-server-management',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    ModalserverComponent,
    UpdatesComponent, 
    DeleteComponent
  ],
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  displayedColumns: string[] = [
    'serverSerialNumber',
    'serverPurchaseDate',
    'serverLocation',
    'assignedAdmin',
    'serverStatus',
    'actions',
  ];

  servers: Server[] = [];

  isModalOpen = false;
  isEditModalOpen = false;
  isDeleteModalOpen = false;
  searchKeyword = '';
  selectedServer: Server | null = null;

  constructor(private featuresService: FeaturesService) {}

  ngOnInit(): void {}

  openModal(server?: Server) {
    this.isModalOpen = true;
    this.selectedServer = server || null;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  openEditModal(server: Server) {
    this.isEditModalOpen = true;
    this.selectedServer = server;
  }

  closeEditModal(): void {
    this.isEditModalOpen = false;
  }

  openDeleteModal(server: Server) {
    this.isDeleteModalOpen = true;
    this.selectedServer = server;
  }

  closeDeleteModal(): void {
    this.isDeleteModalOpen = false;
  }

  onSearch(): void {
    const keyword = this.searchKeyword.trim().toLowerCase();
    if (keyword) {
      this.servers = this.servers.filter(
        (server) =>
          server.serverSerialNumber.toLowerCase().includes(keyword) ||
          server.serverLocation.toLowerCase().includes(keyword) ||
          server.assignedAdmin.toLowerCase().includes(keyword) ||
          server.serverStatus.toLowerCase().includes(keyword)
      );
    }
  }

  clearSearch(): void {
    this.searchKeyword = '';
  }
}
