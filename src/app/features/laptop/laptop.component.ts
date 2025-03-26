import { Component, OnInit } from '@angular/core';
import { ModalComponent } from '../../core/modallaptop/modal.component';
import { CommonModule } from '@angular/common';
import { FeaturesService } from '../features.service';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { UpdatesComponent } from '../../core/updates/updates.component';
import { DeleteComponent } from '../../core/delete/delete.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ModalinfoComponent } from '../../core/modalinfo/modalinfo.component';
import { DialogModule } from '@angular/cdk/dialog';

interface Laptop {
  laptopName: string;
  laptopSerialNumber: string;
  laptopDescription: string;
  laptopPurchaseDate: Date;
  laptopLocation: string;
  laptopAssignedTo: string;
  laptopCondition: string;
}

@Component({
  selector: 'app-laptop',
  imports: [
    ModalComponent,
    UpdatesComponent,
    DeleteComponent,
    CommonModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    FormsModule,
    MatPaginatorModule,
    ModalinfoComponent,
    DialogModule,
    MatDialog
  ],
  templateUrl: './laptop.component.html',
  styleUrls: ['./laptop.component.css'],
  standalone: true,
})
export class LaptopComponent implements OnInit {
  displayedColumns: string[] = [
    'laptopName',
    'laptopSerialNumber',
    'laptopDescription',
    'laptopPurchaseDate',
    'laptopLocation',
    'laptopAssignedTo',
    'laptopCondition',
    'actions',
  ];

  laptops: Laptop[] = [];
  isModalOpen = false;
  isEditModalOpen = false;
  isDeleteModalOpen = false;
  searchKeyword = '';
  pageNo = 1;
  pageSize = 10;
  isEditMode: any;
  selectedLaptop: any = {}; // Ensure it's never undefined

  employees: any[] = []; // Store employee data
  employeeMap: { [key: string]: string } = {}; // Map for quick lookup

  constructor(private FeaturesService: FeaturesService) {}

  ngOnInit(): void {
    this.getEmployees(); // Fetch employees first
    this.getLaptops();
  }

  // Single getLaptops method: fetch from API and filter based on searchKeyword
  getLaptops(): void {
    this.FeaturesService.getAllLaptop().subscribe({
      next: (response) => {
        console.log('API Response:', response);

        if (response && response.laptops) {
          // Use the helper filter function to filter the laptops
          this.laptops = response.laptops.filter((laptop: Laptop) =>
            this.filterLaptops(laptop)
          );
        } else {
          this.laptops = [];
        }

        console.log('Filtered Laptops:', this.laptops);
      },
      error: (error) => console.error('Error fetching laptops:', error),
    });
  }

  // Fetch all employees and create a map of ID -> Name
getEmployees(): void {
  this.FeaturesService.getAllEmployee().subscribe({
    next: (response) => {
      console.log('Employees response:', response);

      // Ensure we are extracting employees correctly
      const employeeArray = response?.employees ?? []; // Correctly access 'employees'
      console.log('Employee Array:', employeeArray);

      // Store employees array for *ngFor
      this.employees = employeeArray;

      // Create a map of employee ID -> employeeName
      this.employeeMap = employeeArray.reduce(
        (map: { [key: string]: string }, employee: { _id: string; employeeName: string }) => {
          map[employee._id] = employee.employeeName;
          return map;
        },
        {}
      );

      console.log('Employee Map:', this.employeeMap);
    },
    error: (error) => console.error('Error fetching employees:', error),
  });
}

    
  // Helper method to get Employee Name from ID
  getEmployeeName(_id: string): string {
    return this.employeeMap[_id] || 'Unknown';
  }

  // Search filter function
  filterLaptops(laptop: Laptop): boolean {
    if (!this.searchKeyword.trim()) {
      return true; // If no search keyword, return all laptops
    }

    const keyword = this.searchKeyword.trim().toLowerCase();
    return (
      laptop.laptopName.toLowerCase().includes(keyword) ||
      laptop.laptopSerialNumber.toLowerCase().includes(keyword) ||
      laptop.laptopDescription.toLowerCase().includes(keyword) ||
      laptop.laptopPurchaseDate.toString().toLowerCase().includes(keyword) ||
      laptop.laptopLocation.toLowerCase().includes(keyword) ||
      laptop.laptopAssignedTo.toLowerCase().includes(keyword) ||
      laptop.laptopCondition.toLowerCase().includes(keyword)
    );
  }

  openModal(laptop?: any) {
    this.isModalOpen = true;
    if (laptop) {
      // Handle the laptop data if needed
    }
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.getLaptops();
  }

  openEditModal(laptop?: any) {
    console.log('Edit button clicked');
    this.isEditModalOpen = true;
    this.selectedLaptop = laptop;
    console.log('Selected Laptop:', this.selectedLaptop);
  }

  closeEditModal(): void {
    this.isEditModalOpen = false;
  }

  openDeleteModal(laptop?: any) {
    console.log('Delete button clicked');
    this.isDeleteModalOpen = true;
    this.selectedLaptop = laptop;
    console.log('Selected Laptop:', this.selectedLaptop);
  }

  closeDeleteModal(): void {
    this.isDeleteModalOpen = false;
  }

  openModalInfo(laptop: any): void {
    this.dialog.open(ModalinfoComponent, {
      data: laptop,
      width: '90vw',  // 90% of the viewport width
      height: '90vh', // 90% of the viewport height
      maxWidth: 'none', // Ensures it doesn't shrink due to Material's default max width
      panelClass: 'full-screen-modal' // Optional: custom styles
    });
  }

  onSearch(): void {
    this.pageNo = 1; // Reset to first page on search
    this.getLaptops();
  }

  clearSearch(): void {
    this.searchKeyword = '';
    // Optionally, call this.getLaptops() to refresh the data without filtering.
  }
}
