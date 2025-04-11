import { Component, EventEmitter, Input, input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FeaturesService } from '../../features/features.service';

interface Desktop {
  desktopName: string;
  desktopSerialNumber: string;
  desktopModel: string;
  desktopProcessor: string;
  desktopRam: string;
  desktopStorage: string;
  desktopPurchaseDate: Date;
  desktopLocation: string;
  desktopAssignedTo: string;
  desktopCondition: string;

}

@Component({
  selector: 'app-modalinfo',
  imports: [
    CommonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  templateUrl: './modalinfo-desktop.component.html',
  styleUrls: ['./modalinfo-desktop.component.css'],
  standalone: true,
})
export class Modalinfo_desktopComponent implements OnInit {
  @Input() selectedDesktop: any;
  @Output() closeModalEvent = new EventEmitter<void>(); // Emits event on close
  isModalOpen = true;

  closeModal(): void {
    this.isModalOpen = false;
    this.closeModalEvent.emit(); // Notify parent that modal is closed

  }

  displayedColumns: string[] = [
    'desktopName',
    'desktopSerialNumber',
    'desktopModel',
    'desktopProcessor',
    'desktopRam',
    'desktopStorage',
    'desktopPurchaseDate',
    'desktopLocation',
    'desktopAssignedTo',
    'desktopCondition',
  ];

  desktops: Desktop[] = [];
  employeeMap: { [key: string]: string } = {};

  constructor(private featuresService: FeaturesService) { }

  ngOnInit(): void {
    this.getEmployees();
    this.getDesktops();
  }

  getDesktops(): void {
    this.featuresService.getAllDesktop().subscribe({
      next: (response: { desktop: Desktop[]; }) => {
        if (response && response.desktop) {
          this.desktops = response.desktop;
        } else {
          this.desktops = [];
        }
      },
      error: (error: any) => console.error('Error fetching desktops:', error),
    });
  }

  getEmployees(): void {
    this.featuresService.getAllEmployee().subscribe({
      next: (response: { employees: never[]; }) => {
        const employeeArray = response?.employees ?? [];
        this.employeeMap = employeeArray.reduce(
          (map: { [key: string]: string }, employee: { _id: string; employeeName: string }) => {
            map[employee._id] = employee.employeeName;
            return map;
          },
          {}
        );
      },
      error: (error: any) => console.error('Error fetching employees:', error),
    });
  }

  getEmployeeName(_id: string): string {
    return this.employeeMap[_id] || 'Unknown';
  }
}