import { Component, EventEmitter, Input, input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FeaturesService } from '../../features/features.service';

interface Laptop {
  laptopName: string;
  laptopSerialNumber: string;
  laptopDescription: string;
  laptopPurchaseDate: Date;
  laptopLocation: string;
  laptopAssignedTo: string;
  laptopCondition: string;
  LaptopAge: string;
  laptopsGranted: number;
  totalDuration: string;
  totalDurationOnGranting: string;

}

@Component({
  selector: 'app-modalinfo',
  imports: [
    CommonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  templateUrl: './modalinfo.component.html',
  styleUrls: ['./modalinfo.component.css'],
  standalone: true,
})
export class ModalinfoComponent implements OnInit {
  @Input() selectedLaptop: any;
  @Output() closeModalEvent = new EventEmitter<void>(); // Emits event on close
  isModalOpen = true;

  closeModal(): void {
    this.isModalOpen = false;
    this.closeModalEvent.emit(); // Notify parent that modal is closed

  }

  displayedColumns: string[] = [
    'laptopName',
    'laptopSerialNumber',
    'laptopDescription',
    'laptopPurchaseDate',
    'laptopLocation',
    'laptopAssignedTo',
    'laptopAge',
    'LaptopsGranted',
    'totalDuration',
    'totalDurationOnGranting',
    'laptopCondition',
  ];

  laptops: Laptop[] = [];
  employeeMap: { [key: string]: string } = {};

  constructor(private featuresService: FeaturesService) { }

  ngOnInit(): void {
    this.getEmployees();
    this.getLaptops();
  }

  getLaptops(): void {
    this.featuresService.getAllLaptop().subscribe({
      next: (response: { laptops: Laptop[]; }) => {
        if (response && response.laptops) {
          this.laptops = response.laptops;
        } else {
          this.laptops = [];
        }
      },
      error: (error: any) => console.error('Error fetching laptops:', error),
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