import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FeaturesService } from '../../features/features.service';

interface Laptop {
  employeeName: string;
  employmentDate: string;
  employmentPeriod: string;
}

@Component({
  selector: 'app-modalinfoemp',
  imports: [
    CommonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  templateUrl: './modalinfoemp.component.html',
  styleUrls: ['./modalinfoemp.component.css'],
  standalone: true,
})
export class ModalinfoEmpComponent implements OnInit {
  @Input() selectedLaptop: any;
  @Output() closeModalEvent = new EventEmitter<void>(); // Emits event on close
  isModalOpen = true;

  // Fix: Declare the Employees array
  Employees: Laptop[] = [];

  closeModal(): void {
    this.isModalOpen = false;
    this.closeModalEvent.emit(); // Notify parent that modal is closed
  }

  displayedColumns: string[] = [
    'employeeName',
    'employmentDate',
    'employmentPeriod',
    'actions'
  ];

  employeeMap: { [key: string]: string } = {};

  constructor(private featuresService: FeaturesService) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  // Fix: Changed function name and corrected API call
  getemployees(): void {
    this.featuresService.getAllEmployee().subscribe({
      next: (response: { employees: Laptop[] }) => {
        if (response && response.employees) {
          this.Employees = response.employees; // Fix: Assign to correct variable
        } else {
          this.Employees = [];
        }
      },
      error: (error: any) => console.error('Error fetching employees:', error),
    });
  }

  getEmployees(): void {
    this.featuresService.getAllEmployee().subscribe({
      next: (response: { employees: Laptop[] }) => {
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
